"use client";

import OrderDetailModal from "./OrderDetailModal";
import { useState } from "react";
import StatusBadge from "@/app/components/admin/StatusBadge";
import OrderStatus from "@/app/components/admin/OrderStatus";

type Order = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  total: number;
  status: string;
  trackingNumber: string | null;
  createdAt: Date;

  province: string;
  city: string;
  district: string;
  postalCode: string;
  address: string;

  items: {
    id: number;
    title: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
  }[];
};

export default function OrdersTable({
  orders,
}: {
  orders: Order[];
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      order.fullName.toLowerCase().includes(keyword) ||
      order.phone.toLowerCase().includes(keyword) ||
      order.email.toLowerCase().includes(keyword);

    const matchStatus =
      statusFilter === "ALL" ||
      order.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">

      <input
        type="text"
        placeholder="Cari nama, email, nomor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 outline-none focus:border-white"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
      >
        <option value="ALL">Semua Status</option>
        <option value="PENDING">🟡 Pending</option>
        <option value="DIPROSES">⚙️ Diproses</option>
        <option value="DIKIRIM">📦 Dikirim</option>
        <option value="SELESAI">🎉 Selesai</option>
      </select>

      <p className="text-sm text-zinc-400">
        📦 Menampilkan <b>{filteredOrders.length}</b> Order
      </p>

      {filteredOrders.map((order) => (
        <div
          key={order.id}
          className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
        >
          <div className="flex items-start justify-between">

            <div className="flex-1">

              <h2 className="text-2xl font-bold">
                {order.fullName}
              </h2>

              <p className="text-zinc-400">
                📞 {order.phone}
              </p>

              <p className="text-zinc-400">
                ✉ {order.email}
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                📅{" "}
                {new Date(order.createdAt).toLocaleString("id-ID", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>

              <div className="mt-5 flex flex-wrap gap-4">

                <div className="min-w-[320px] flex-1 rounded-xl bg-zinc-900 p-4">

                  <p className="mb-3 text-sm font-semibold text-zinc-400">
                    📍 Alamat Pengiriman
                  </p>

                  <p>{order.address}</p>
                  <p>{order.district}</p>
                  <p>{order.city}</p>
                  <p>{order.province}</p>
                  <p>{order.postalCode}</p>

                </div>

                <div className="w-64 rounded-xl bg-zinc-900 p-4">

                  <p className="text-sm text-zinc-500">
                    Total Belanja
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    Rp {order.total.toLocaleString("id-ID")}
                  </h2>

                  <div className="mt-4">
                    <StatusBadge status={order.status} />
                  </div>

                </div>

              </div>

            </div>

            <div className="ml-6 flex w-64 shrink-0 flex-col gap-3">

              <button
                onClick={() => setSelectedOrder(order)}
                className="w-full rounded-xl bg-blue-600 px-4 py-2 font-bold hover:bg-blue-500"
              >
                👁 Lihat Detail
              </button>

              <OrderStatus
                id={order.id}
                currentStatus={order.status}
                trackingNumber={order.trackingNumber}
              />

              <button
                onClick={() => {
                  const alamat =
                    order.fullName + "\n" +
                    order.phone + "\n\n" +
                    order.address + "\n" +
                    order.district + "\n" +
                    order.city + "\n" +
                    order.province + "\n" +
                    order.postalCode;

                  navigator.clipboard.writeText(alamat);

                  alert("Alamat berhasil disalin!");
                }}
                className="w-full rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold hover:bg-zinc-700"
              >
                📋 Copy Alamat
              </button>

              <a
                href={"https://wa.me/" + order.phone.replace(/^0/, "62")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-green-600 px-4 py-2 text-center text-sm font-bold hover:bg-green-500"
              >
                💬 WhatsApp
              </a>

            </div>

          </div>

          <div className="mt-6 rounded-xl bg-zinc-900 p-5">

            <p className="mb-4 font-semibold">
              Item Pesanan
            </p>

            <div className="space-y-3">

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-zinc-800 py-3 last:border-0"
                >

                  <div>
                    <p className="font-bold">
                      {item.title}
                    </p>

                    <p className="text-sm text-zinc-500">
                      {item.color} • {item.size}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm">
                      Qty {item.quantity}
                    </p>

                    <p className="font-bold">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      ))}

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

    </div>
  );
}