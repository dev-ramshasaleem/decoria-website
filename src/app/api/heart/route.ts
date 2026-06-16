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
    const {productId}= await req.json()

    const existingItem = await prisma.heartItem.findFirst({
        where:{
            userId,
            productId,
        },

    });
    
  return NextResponse.json({ success: true });
}