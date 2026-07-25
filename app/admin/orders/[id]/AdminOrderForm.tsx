"use client";

import { useState } from "react";

export default function AdminOrderForm({
  order,
}: {
  order: any;
}) {
  const [status, setStatus] = useState(order.status);

  const [trackingNumber, setTrackingNumber] =
    useState(order.trackingNumber ?? "");

  async function saveOrder() {
    const res = await fetch("/api/admin/orders/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  id: order.id,
  status,
  trackingNumber,
      }),
    });

    if (!res.ok) {
      alert("Gagal menyimpan");
      return;
    }

    alert("Berhasil disimpan");
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <h1 className="mb-8 text-4xl font-black">
        {order.orderNumber}
      </h1>

      <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-8">

        <p>
          <b>Customer :</b> {order.fullName}
        </p>

        <p>
          <b>Email :</b> {order.email}
        </p>

        <p>
          <b>WA :</b> {order.phone}
        </p>

        <div>

          <label>Status</label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="mt-2 w-full rounded-xl bg-zinc-900 p-4"
          >
            <option>PENDING</option>
            <option>DIPROSES</option>
            <option>DIKIRIM</option>
            <option>SELESAI</option>
          </select>

        </div>

        <div>

          <label>No Resi</label>

          <input
            value={trackingNumber}
            onChange={(e) =>
              setTrackingNumber(e.target.value)
            }
            className="mt-2 w-full rounded-xl bg-zinc-900 p-4"
          />

        </div>

        <button
          onClick={saveOrder}
          className="rounded-xl bg-white px-8 py-4 font-bold text-black"
        >
          SIMPAN
        </button>

      </div>

    </main>
  );
}