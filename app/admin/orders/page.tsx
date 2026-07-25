import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <div className="mb-10 flex items-center justify-between">

  <h1 className="text-5xl font-black">
    ADMIN ORDERS
  </h1>

  <Link
    href="/admin/logout"
    className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white"
  >
    Logout
  </Link>

</div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800">

        <table className="w-full">

          <thead className="bg-zinc-900">

            <tr>

              <th className="p-4 text-left">
                Order
              </th>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Detail
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-t border-zinc-800"
              >

                <td className="p-4 font-bold">
                  {order.orderNumber}
                </td>

                <td className="p-4">
                  {order.fullName}
                </td>

                <td className="p-4">

                  <span className="rounded-full bg-zinc-800 px-4 py-2">

                    {order.status}

                  </span>

                </td>

                <td className="p-4">

                  Rp {order.total.toLocaleString("id-ID")}

                </td>

                <td className="p-4">

                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="rounded-lg bg-white px-4 py-2 font-bold text-black"
                  >
                    Detail
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}