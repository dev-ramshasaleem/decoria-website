import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

    const total = cartItems.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        name,
        email,
        phone,
        address,
      },
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