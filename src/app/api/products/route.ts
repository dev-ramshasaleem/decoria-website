import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || "",
        price: Number(body.price),
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function GET(){
  const products= await prisma.product.findMany()
  return NextResponse.json(products)
}