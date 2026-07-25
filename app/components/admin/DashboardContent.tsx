import RecentOrder from "./RecentOrder";
import Link from "next/link";
import ProductTable from "./ProductTable";
import RevenueChart from "./RevenueChart";
import { prisma } from "@/app/lib/prisma";

export default async function DashboardContent() {

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const revenueMap = new Map<string, number>();

  orders.forEach((order) => {

    const day = order.createdAt.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });

    revenueMap.set(
      day,
      (revenueMap.get(day) ?? 0) + order.total
    );

  });

  const chartData = [...revenueMap.entries()].map(
    ([day, total]) => ({
      day,
      total,
    })
  );

  return (
    <div className="space-y-8">

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">

        <h2 className="mb-6 text-2xl font-bold">
          Quick Action
        </h2>

        <Link
          href="/admin/products"
          className="inline-block rounded-xl bg-white px-6 py-4 font-bold text-black"
        >
          + Tambah Produk
        </Link>

      </div>

      <RevenueChart data={chartData} />
      <RecentOrder/>

      <ProductTable />

    </div>
  );
}