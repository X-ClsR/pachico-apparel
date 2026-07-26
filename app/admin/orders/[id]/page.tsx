import { prisma } from "@/app/lib/prisma";
import OrdersTable from "./components/OrdersTable";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
    },
  });

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="mb-8 text-4xl font-black">
        ADMIN ORDERS
      </h1>

      <OrdersTable orders={orders} />
    </main>
  );
}