"use client";

import { useState } from "react";

type Order = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  total: number;
  status: string;
  trackingNumber: string | null;

  items: {
    id: number;
    title: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
  }[];
};
export default function TrackingPage() {
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState<Order | null>(null);

  async function searchOrder() {

  const res = await fetch("/api/tracking", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      keyword,
    }),

  });

  if (!res.ok) {

    alert("Pesanan tidak ditemukan");

    return;

  }

  const data = await res.json();

  setOrder(data);

}

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">

      <h1 className="mb-2 text-4xl font-black">
        Lacak Pesanan
      </h1>

      <p className="mb-8 text-zinc-500">
        Masukkan Email atau Nomor WhatsApp
      </p>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="contoh@email.com / 08123456789"
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 outline-none focus:border-white"
      />

      <button
  onClick={searchOrder}
  className="mt-5 rounded-xl bg-white px-8 py-3 font-bold text-black"
>
  Cari Pesanan
</button>
{order && (
  <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

    <h2 className="text-2xl font-black">
      Pesanan Ditemukan
    </h2>

    <p className="mt-4">
      <b>Nama :</b> {order.fullName}
    </p>

    <div className="mt-8">

  <h3 className="mb-4 text-xl font-bold">
    Progress Pesanan
  </h3>

  <div className="space-y-4">

    <div
      className={`rounded-xl p-4 ${
        ["PENDING","DIPROSES","DIKIRIM","SELESAI"].includes(order.status)
          ? "bg-yellow-600"
          : "bg-zinc-800"
      }`}
    >
      🟡 Pesanan Dibuat
    </div>

    <div
      className={`rounded-xl p-4 ${
        ["DIPROSES","DIKIRIM","SELESAI"].includes(order.status)
          ? "bg-blue-600"
          : "bg-zinc-800"
      }`}
    >
      ⚙ Sedang Diproses
    </div>

    <div
      className={`rounded-xl p-4 ${
        ["DIKIRIM","SELESAI"].includes(order.status)
          ? "bg-orange-500"
          : "bg-zinc-800"
      }`}
    >
      📦 Sedang Dikirim
    </div>

    <div
      className={`rounded-xl p-4 ${
        order.status === "SELESAI"
          ? "bg-green-600"
          : "bg-zinc-800"
      }`}
    >
      🎉 Pesanan Selesai
    </div>

  </div>

</div>

    <p>
      <b>Total :</b> Rp {order.total.toLocaleString("id-ID")}
    </p>

    {order.trackingNumber && (
      <p>
        <b>No Resi :</b> {order.trackingNumber}
      </p>
    )}
<div className="mt-10">

  <h3 className="mb-5 text-xl font-bold">
    Produk
  </h3>

  <div className="space-y-4">

    {order.items.map((item) => (

      <div
        key={item.id}
        className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
      >

        <img
          src={item.image}
          alt={item.title}
          className="h-24 w-24 rounded-xl object-cover"
        />

        <div className="flex-1">

          <h4 className="text-lg font-bold">
            {item.title}
          </h4>

          <p className="text-zinc-400">
            {item.color}
          </p>

          <p className="text-zinc-400">
            Size {item.size}
          </p>

        </div>

        <div className="text-right">

          <p className="font-bold">
            Qty {item.quantity}
          </p>

          <p className="text-lg font-black">
            Rp {item.price.toLocaleString("id-ID")}
          </p>

        </div>

      </div>

    ))}

  </div>

</div>
  </div>
)}

    </main>
  );
}