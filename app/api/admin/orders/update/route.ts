import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const order = await prisma.order.update({
      where: {
        id: body.id,
      },
      data: {
        status: body.status,
        trackingNumber: body.trackingNumber,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Update gagal" },
      { status: 500 }
    );
  }
}