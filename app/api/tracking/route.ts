import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {

  const body = await req.json();

  const keyword = body.keyword;

  const order = await prisma.order.findFirst({

    where: {
      OR: [
        {
          email: keyword,
        },
        {
          phone: keyword,
        },
      ],
    },

    include: {
      items: true,
    },

  });

  if (!order) {

    return NextResponse.json(
      {
        message: "Order tidak ditemukan.",
      },
      {
        status: 404,
      }
    );

  }

  return NextResponse.json(order);

}