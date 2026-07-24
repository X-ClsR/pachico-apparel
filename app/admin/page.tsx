import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-black px-8 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-10 text-4xl font-bold">
          PACHICO PRODUCTS
        </h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (

            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition hover:border-white"
            >

              <img
                src={product.imageFront}
                alt={product.title}
                className="aspect-square w-full object-cover"
              />

              <div className="space-y-2 p-5">

                <p className="text-sm text-zinc-500">
                  {product.category}
                </p>

                <h2 className="font-bold">
                  {product.title}
                </h2>

                <p className="font-bold text-xl">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </main>
  );
}