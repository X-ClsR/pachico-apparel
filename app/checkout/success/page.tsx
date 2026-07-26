import Link from "next/link";

type Props = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export default async function SuccessPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const orderNumber = params.order ?? "-";

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center">

        <div className="mb-6 text-6xl">
          ✅
        </div>

        <h1 className="text-4xl font-black">
          PESANAN BERHASIL
        </h1>

        <p className="mt-5 text-zinc-400">
          Terima kasih sudah berbelanja di
          <span className="font-bold text-white">
            {" "}PACHICO
          </span>
        </p>

        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            ORDER NUMBER
          </p>

          <h2 className="mt-3 text-3xl font-black text-green-400">
            {orderNumber}
          </h2>
        </div>

        <p className="mt-8 text-sm leading-7 text-zinc-500">
          Simpan nomor pesanan ini.
          <br />
          Gunakan nomor tersebut untuk melacak status pesanan Anda.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <Link
            href="/tracking"
            className="rounded-xl bg-white py-4 font-bold text-black transition hover:scale-105"
          >
            Lacak Pesanan
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-zinc-700 py-4 font-bold transition hover:bg-zinc-900"
          >
            Kembali Belanja
          </Link>
        </div>

      </div>
    </main>
  );
}