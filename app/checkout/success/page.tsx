import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">

        <h1 className="text-5xl font-black">
          ORDER BERHASIL 🎉
        </h1>

        <p className="mt-6 text-zinc-400">
          Terima kasih sudah berbelanja di PACHICO.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block rounded-lg bg-white px-8 py-4 font-bold text-black"
        >
          Kembali ke Home
        </Link>

      </div>
    </main>
  );
}