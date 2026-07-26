import { prisma } from "@/app/lib/prisma";

export default async function ProductSection() {
  const products = await prisma.product.findMany();

  return (
    <section className="bg-red-600 p-10 text-white">
      <h1 className="text-5xl">
        TEST PRODUCT SECTION
      </h1>

      <p>Total Product: {products.length}</p>

      {products.map((p) => (
        <div key={p.id}>
          {p.title}
        </div>
      ))}
    </section>
  );
}