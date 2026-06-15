import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const {userId}=await auth()

    if(!userId){
        return NextResponse.json({ message: "Unauthorised"}, {status: 401})
    }

    const {productId, action}=await req.json()
    const item = await prisma.cartItem.findFirst({
        where:{
            userId, productId,
        },
    });
    if (!item){
        return NextResponse.json({message: "Items Not Found"}, {status: 404})
    }


    if (action === "increase") {
    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity: item.quantity + 1 },
    });
  }

  if (action === "decrease") {
    if (item.quantity === 1) {
      await prisma.cartItem.delete({
        where: { id: item.id },
      });
    } else {
      await prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity: item.quantity - 1 },
      });
    }
  }

  return NextResponse.json({ success: true });
}