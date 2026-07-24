import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const order = await prisma.order.create({
      data: {
        fullName: body.customer.fullName,
        phone: body.customer.phone,
        email: body.customer.email,

        province: body.customer.province,
        city: body.customer.city,
        district: body.customer.district,
        postalCode: body.customer.postalCode,
        address: body.customer.address,

        subtotal: body.subtotal,
        shipping: body.shipping,
        total: body.total,

        items: {
          create: body.items.map(
            (item: {
              id: number;
              title: string;
              color: string;
              size: string;
              quantity: number;
              price: number;
              image: string;
            }) => ({
              productId: item.id,
              title: item.title,
              color: item.color,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
              image: item.image,
            })
          ),
        },
      },

      include: {
        items: true,
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        message: "Failed create order",
      },
      {
        status: 500,
      }
    );
  }
}