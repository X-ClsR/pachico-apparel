import ProductCard from "./ProductCard";
import type { Product } from "@/app/types/product";
import { prisma } from "@/app/lib/prisma";

async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function ProductSection() {
  const products = await getProducts();

  return (
    <section
  id="products"
  className="bg-black px-6 py-20"
>
      <h2 className="mb-12 text-center text-4xl font-bold text-white">
        OUR PRODUCTS
      </h2>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}