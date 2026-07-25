"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderStatus({
  id,
  currentStatus,
  trackingNumber: initialTrackingNumber,
}: {
  id: number;
  currentStatus: string;
  trackingNumber: string | null;
}) {
  const router = useRouter();

  const [status, setStatus] = useState(currentStatus);
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber?? ""
    
  );

  async function updateStatus(value: string) {
    setStatus(value);

    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: value,
      }),
    });

    router.refresh();
  }

  async function saveTracking() {
    if (!trackingNumber) {
      alert("Masukkan nomor resi.");
      return;
    }

    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trackingNumber,
      }),
    });

    alert("Nomor resi berhasil disimpan.");

    router.refresh();
  }

  return (
    <div className="mt-4 flex flex-col gap-3">

      <select
        value={status}
        onChange={(e) => updateStatus(e.target.value)}
        className="rounded bg-zinc-900 p-2 text-white"
      >
        <option value="PENDING">🟡 PENDING</option>
        <option value="DIPROSES">⏳ DIPROSES</option>
        <option value="DIKIRIM">📦 DIKIRIM</option>
        <option value="SELESAI">🎉 SELESAI</option>
      </select>

      <input
        type="text"
        placeholder="Nomor Resi"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        className="rounded bg-zinc-900 p-2 text-white"
      />

      <button
        onClick={saveTracking}
        className="rounded bg-blue-600 px-4 py-2 font-bold hover:bg-blue-500"
      >
        💾 Simpan Resi
      </button>

    </div>
  );
}