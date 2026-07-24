import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import ProductDetailClient from "@/app/components/ProductDetailClient";
import { prisma } from "@/app/lib/prisma";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetail({
  params,
}: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Produk tidak ditemukan
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <ProductDetailClient product={product} />
      <CartDrawer />
    </>
  );
}