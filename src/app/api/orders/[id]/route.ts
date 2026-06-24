import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request,
    {params}:{params:Promise<{id:string}>}
){
    try{
        const {status}=await req.json()
        const{id}=await params

        const order=await prisma.order.update({
            where:{
                id,
            },
            data:{
                status,
            }
        })
        return Response.json(order)
    }catch(err){
        return NextResponse.json(
            { message: "Failed to update order" },
        )
    }
}