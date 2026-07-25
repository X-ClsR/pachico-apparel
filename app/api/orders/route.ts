import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await prisma.$transaction(async (tx) => {
      // ============================
      // VALIDASI STOCK
      // ============================

      for (const item of body.items) {
        const product = await tx.product.findUnique({
          where: {
            id: item.id,
          },
        });

        if (!product) {
          throw new Error(`Produk ${item.title} tidak ditemukan.`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Stock ${item.title} tidak mencukupi.`);
        }
      }

      // ============================
      // GENERATE ORDER NUMBER
      // ============================

      const today = new Date();

      const date =
        today.getFullYear().toString() +
        String(today.getMonth() + 1).padStart(2, "0") +
        String(today.getDate()).padStart(2, "0");

      const totalOrder = await tx.order.count();

      const runningNumber = String(totalOrder + 1).padStart(4, "0");

      const orderNumber = `PCH-${date}-${runningNumber}`;

      // ============================
      // CREATE ORDER
      // ============================

      const order = await tx.order.create({
        data: {
          orderNumber,

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

      // ============================
      // KURANGI STOCK
      // ============================

      for (const item of body.items) {
        await tx.product.update({
          where: {
            id: item.id,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order;
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        message:
          err instanceof Error
            ? err.message
            : "Checkout gagal",
      },
      {
        status: 400,
      }
    );
  }
}