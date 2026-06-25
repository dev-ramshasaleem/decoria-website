import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const {userId}=await auth()

    if (!userId){
        return NextResponse.json({ success: false }, { status: 401 });
    }
    const {productId}= await req.json()

    const existingItem = await prisma.heartItem.findFirst({
        where:{
            userId,
            productId,
        },

    });
    if (existingItem){
        await prisma.heartItem.delete({
            where:{id: existingItem.id}
        })
        return NextResponse.json({ isFavorite: false})
    }
    await prisma.heartItem.create({
        data:{
            userId, productId
        },
    })
    
  return NextResponse.json({  isFavorite: true  });


  
} 
