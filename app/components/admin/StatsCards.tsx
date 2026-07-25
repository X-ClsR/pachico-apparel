import { prisma } from "@/app/lib/prisma";

export default async function StatsCards() {

  const totalProducts = await prisma.product.count();

  const totalOrders = await prisma.order.count();

  const revenue = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
  });

  const totalCustomers = await prisma.order.groupBy({
    by: ["email"],
  });

  return (

    <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-white">
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          💰 Revenue
        </p>

        <h2 className="mt-4 text-4xl font-black">
          Rp {(revenue._sum.total ?? 0).toLocaleString("id-ID")}
        </h2>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-white">
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          📦 Orders
        </p>

        <h2 className="mt-4 text-4xl font-black">
          {totalOrders}
        </h2>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-white">
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          👕 Products
        </p>

        <h2 className="mt-4 text-4xl font-black">
          {totalProducts}
        </h2>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-white">
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          👤 Customers
        </p>

        <h2 className="mt-4 text-4xl font-black">
          {totalCustomers.length}
        </h2>
      </div>

    </div>

  );
}