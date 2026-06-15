import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const {userId}=await auth()

    if (!userId){
        return NextResponse.json(
            {message:"Unauthorized"},
            {status: 401}
        )
    }
    const {productId, action}= await req.json()

    const existingItem = await prisma.cartItem.findFirst({
        where:{
            userId,
            productId,
        },

    });
     if (!existingItem) {
    if (action === "increase" || !action) {
      await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity: 1,
        },
      });
    }

    return NextResponse.json({ success: true });
  }

  
  if (action === "increase") {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + 1,
      },
    });
  }

  
  if (action === "decrease") {
    if (existingItem.quantity === 1) {
      // remove item completely
      await prisma.cartItem.delete({
        where: { id: existingItem.id },
      });
    } else {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity - 1,
        },
      });
    }
  }

  return NextResponse.json({ success: true });
}