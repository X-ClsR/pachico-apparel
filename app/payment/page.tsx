"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { CheckoutContext } from "@/app/context/CheckoutContext";

export default function PaymentPage() {
  const router = useRouter();

  const checkoutContext = useContext(CheckoutContext);

  if (!checkoutContext) return null;

  const { orderNumber } = checkoutContext;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">

      <div className="max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center">

        <h1 className="text-4xl font-black">
          Pembayaran
        </h1>

        <div className="mt-6 rounded-xl bg-zinc-900 p-5 text-left">

          <p>
            <b>Metode Pembayaran</b>
          </p>

          <p className="mt-2">
            QRIS GoPay Merchant
          </p>

          <p className="mt-4 text-sm text-zinc-400">
            Silakan scan menggunakan GoPay,
            Dana, OVO, ShopeePay, Mobile Banking,
            atau aplikasi lain yang mendukung QRIS.
          </p>

        </div>

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">

          <p className="text-sm text-zinc-400">
            Nomor Pesanan
          </p>

          <p className="mt-2 text-2xl font-black">
            {orderNumber}
          </p>

        </div>

        <p className="mt-6 text-zinc-400">
          Silakan scan QRIS di bawah ini.
        </p>

        <div className="mt-8 rounded-xl bg-white p-5">

          <img
            src="/qris.jpg"
            alt="QRIS"
            className="mx-auto w-full max-w-sm"
          />

        </div>

        <p className="mt-6 text-sm text-zinc-500">
          Setelah pembayaran berhasil,
          admin akan memverifikasi pesanan Anda.
        </p>

        <div className="mt-8 space-y-4">

          <button
            onClick={() => {
              router.push(
                `/checkout/success?order=${orderNumber}`
              );
            }}
            className="w-full rounded-xl bg-white py-4 font-bold text-black transition hover:scale-105"
          >
            ✅ Saya Sudah Bayar
          </button>

          <p className="text-sm text-zinc-500">
            Simpan nomor pesanan di atas untuk
            proses verifikasi.
          </p>

        </div>

      </div>

    </main>
  );
}