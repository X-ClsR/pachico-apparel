import Link from "next/link";
import ProductTable from "./ProductTable";

export default function DashboardContent() {
  return (
    <div className="space-y-8">

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">

        <h2 className="mb-6 text-2xl font-bold">
          Quick Action
        </h2>

        <Link
          href="/admin/products"
          className="rounded-xl bg-white py-4 px-6 text-black font-bold inline-block"
        >
          + Tambah Produk
        </Link>

      </div>

      <h1 className="text-3xl">
        DashboardContent OK
      </h1>

      <ProductTable />

    </div>
  );
}