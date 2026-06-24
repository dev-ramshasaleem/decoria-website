import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  let body;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body" }
      
    );
  }

  const { name, email, phone, address, paymenthMethod } = body || {};

  if (!name || !email || !phone || !address) {
    return NextResponse.json(
      { message: "Missing checkout fields" }
      
    );
  }

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return NextResponse.json(
        { message: "Cart empty" }
        
      );
    }

    const total = Number(cartItems.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    ).toFixed(2));
    

    const order = await prisma.order.create({
      data: {
        name,
        customerEmail: email,
        phone,
        address,
        total,
        status: "PENDING",

        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },

      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });


    await resend.emails.send({
  from: "orders@decoria-ruby.vercel.app",
  to: process.env.ADMIN_EMAIL!,
  subject: `🛒 New Order ${order.id}`,
  html: `
    <h2>New Order Received</h2>

    <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Total:</strong> $${order.total}</p>


    <h3>Products</h3>

    <ul>
          ${order.orderItems
            .map(
              (item) =>
                `<li>${item.product.name} × ${item.quantity}</li>`
            )
            .join("")}
        </ul>
  `,
});

await resend.emails.send({
  from: "orders@decoria-ruby.vercel.app",
  to: order.customerEmail,
  subject: "Order Confirmation",
  html: `
    <h2>Thank you for your order!</h2>

    <p>Your order has been received.</p>

    <p><strong>Order ID:</strong> ${order.id}</p>

    <p>Status: PENDING</p>
  `,
});

    await prisma.orderItem.createMany({
      data: cartItems.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
      })),
    });

    await prisma.cartItem.deleteMany({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
}