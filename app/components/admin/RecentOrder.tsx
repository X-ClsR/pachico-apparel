import { prisma } from "@/app/lib/prisma";
import StatusBadge from "./StatusBadge";

export default async function RecentOrder() {
  const orders = await prisma.order.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Orders
      </h2>

      <div className="space-y-5">

        {orders.map((order) => (

          <div
            key={order.id}
            className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
          >

            <div>

              <p className="font-bold">
                {order.fullName}
              </p>

              <p className="text-sm text-zinc-500">
                {order.email}
              </p>

            </div>

            <div className="text-right">

              <p className="font-bold">
                Rp {order.total.toLocaleString("id-ID")}
              </p>

              <StatusBadge status={order.status} />

            </div>

          </div>

        ))}

        {orders.length === 0 && (
          <p className="text-zinc-500">
            Belum ada order.
          </p>
        )}

      </div>

    </div>
  );
}