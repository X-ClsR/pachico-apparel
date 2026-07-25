import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc"
      
    },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
  slug: body.slug,
  title: body.title,
  category: body.category,
  description: body.description,

  price: Number(body.price),
  stock: Number(body.stock),

  material: body.material,
  printMethod: body.printMethod,
  imageFront: body.imageFront,
  imageBack: body.imageBack,
  sizes: body.sizes,
},
    });

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed create product",
      },
      {
        status: 500,
      }
    );
  }
}