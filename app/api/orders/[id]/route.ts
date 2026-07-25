import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status, trackingNumber } = await req.json();

    const { id } = await params;

    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(status && {
          status,
        }),

        ...(trackingNumber !== undefined && {
          trackingNumber,
          status: "DIKIRIM",
        }),
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed update order",
      },
      {
        status: 500,
      }
    );
  }
}