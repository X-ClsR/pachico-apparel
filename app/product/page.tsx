import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function ProductPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        PRODUCT CATALOG
      </h1>

      <div className="grid grid-cols-4 gap-8">

        {products.map((product) => (

          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="rounded-xl overflow-hidden border border-zinc-800 hover:border-white transition"
          >

            <img
              src={product.imageFront}
              alt={product.title}
              className="aspect-square w-full object-cover"
            />

            <div className="p-4">

              <h2 className="font-bold">
                {product.title}
              </h2>

              <p className="text-zinc-500 text-sm">
                {product.category}
              </p>

              <p className="mt-3 text-xl font-bold">
                Rp {product.price.toLocaleString("id-ID")}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </main>
  );
}