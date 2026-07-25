import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import AdminOrderForm from "./AdminOrderForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetail({
  params,
}: Props) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return <AdminOrderForm order={order} />;
}