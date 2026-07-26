import SalesChart from "../components/SalesChart";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";
export default async function AdminDashboard() {

  const totalProducts = await prisma.product.count();

  const totalOrders = await prisma.order.count();

  const revenue = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
  });

  const lowStock = await prisma.product.count({
    where: {
      stock: {
        lte: 5,
      },
    },
  });

  const soldOut = await prisma.product.count({
    where: {
      stock: 0,
    },
  });

  const today = new Date();

today.setHours(0, 0, 0, 0);

const startOfMonth = new Date(
  today.getFullYear(),
  today.getMonth(),
  1
);

const revenueToday = await prisma.order.aggregate({
  _sum: {
    total: true,
  },
  where: {
    createdAt: {
      gte: today,
    },
  },
});

const revenueMonth = await prisma.order.aggregate({
  _sum: {
    total: true,
  },
  where: {
    createdAt: {
      gte: startOfMonth,
    },
  },
});

const bestSelling = await prisma.orderItem.groupBy({
  by: ["title"],

  _sum: {
    quantity: true,
  },

  orderBy: {
    _sum: {
      quantity: "desc",
    },
  },

  take: 5,
});
const chartData = [
  {
    day: "Sen",
    total: 3,
  },
  {
    day: "Sel",
    total: 5,
  },
  {
    day: "Rab",
    total: 2,
  },
  {
    day: "Kam",
    total: 8,
  },
  {
    day: "Jum",
    total: 6,
  },
  {
    day: "Sab",
    total: 9,
  },
  {
    day: "Min",
    total: 4,
  },
];

const latestOrders = await prisma.order.findMany({
  take: 5,
  orderBy: {
    createdAt: "desc",
  },
});
  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <h1 className="mb-8 text-4xl font-black">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-7">

        <div className="rounded-2xl bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Total Produk
          </p>

          <h2 className="mt-3 text-4xl font-black">
            {totalProducts}
          </h2>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Total Order
          </p>

          <h2 className="mt-3 text-4xl font-black">
            {totalOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Revenue
          </p>

          <h2 className="mt-3 text-3xl font-black">
            Rp {(revenue._sum.total ?? 0).toLocaleString("id-ID")}
          </h2>
        </div>

        <div className="rounded-2xl bg-yellow-600 p-6 text-black">
          <p>
            Stock Menipis
          </p>

          <h2 className="mt-3 text-4xl font-black">
            {lowStock}
          </h2>
        </div>

        <div className="rounded-2xl bg-red-600 p-6">
          <p>
            Sold Out
          </p>

          <h2 className="mt-3 text-4xl font-black">
            {soldOut}
          </h2>
          <div className="rounded-2xl bg-blue-700 p-6">

  <p className="text-blue-100">
    Revenue Hari Ini
  </p>

  <h2 className="mt-3 text-2xl font-black">
    Rp {(revenueToday._sum.total ?? 0).toLocaleString("id-ID")}
  </h2>

</div>

<div className="rounded-2xl bg-purple-700 p-6">

  <p className="text-purple-100">
    Revenue Bulan Ini
  </p>

  <h2 className="mt-3 text-2xl font-black">
    Rp {(revenueMonth._sum.total ?? 0).toLocaleString("id-ID")}
  </h2>

</div>
        </div>

      </div>

<div className="mt-10 rounded-2xl bg-zinc-900 p-6">

  <h2 className="mb-6 text-2xl font-bold">
    Order Terbaru
  </h2>

  <table className="w-full">

    <thead>

      <tr className="border-b border-zinc-700">

        <th className="py-3 text-left">
          Customer
        </th>

        <th className="text-left">
          Total
        </th>

        <th className="text-left">
          Status
        </th>

        <th className="text-left">
          Tanggal
        </th>

      </tr>

    </thead>

    <tbody>

      {latestOrders.map((order) => (

        <tr
          key={order.id}
          className="border-b border-zinc-800"
        >

          <td className="py-4">
            {order.fullName}
          </td>

          <td>
            Rp {order.total.toLocaleString("id-ID")}
          </td>

          <td>
            {order.status}
          </td>

          <td>
            {new Date(order.createdAt).toLocaleDateString("id-ID")}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>
<div className="mt-10 rounded-2xl bg-zinc-900 p-6">

  <h2 className="mb-6 text-2xl font-bold">

    🏆 Produk Terlaris

  </h2>

  <table className="w-full">

    <thead>

      <tr className="border-b border-zinc-700">

        <th className="py-3 text-left">
          Produk
        </th>

        <th className="text-left">
          Terjual
        </th>

      </tr>

    </thead>

    <tbody>

      {bestSelling.map((item) => (

        <tr
          key={item.title}
          className="border-b border-zinc-800"
        >

          <td className="py-4 font-semibold">

            {item.title}

          </td>

          <td>

            {item._sum.quantity ?? 0} pcs

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div><SalesChart
  data={chartData}
/>

</main>
  );

}