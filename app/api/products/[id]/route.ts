import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// ==========================
// UPDATE PRODUCT
// ==========================

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(product);
}export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id } = await params;

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        slug: body.slug,
        title: body.title,
        category: body.category,
        description: body.description,
        price: body.price,
        stock: body.stock,
        material: body.material,
        printMethod: body.printMethod,
        imageFront: body.imageFront,
        imageBack: body.imageBack,
        sizes: body.sizes,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal update produk." },
      { status: 500 }
    );
  }
}

// ==========================
// DELETE PRODUCT
// ==========================

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal menghapus produk." },
      { status: 500 }
    );
  }
}