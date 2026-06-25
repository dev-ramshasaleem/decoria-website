// app/api/heart/[productId]/route.ts

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { productId } = await params;

  await prisma.heartItem.deleteMany({
    where: {
      userId,
      productId,
    },
  });

  return NextResponse.json({
    success: true,
  });
}