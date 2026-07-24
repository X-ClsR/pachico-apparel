import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-8">

      <h1 className="text-3xl font-black tracking-widest">
        PACHICO
      </h1>

      <p className="mt-1 text-sm text-zinc-500">
        ADMIN PANEL
      </p>

      <div className="my-8 h-px bg-zinc-800" />

      <nav className="space-y-2">

        <Link
          href="/admin"
          className="block w-full rounded-xl bg-white px-5 py-4 font-semibold text-black"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/products"
          className="block w-full rounded-xl px-5 py-4 transition hover:bg-zinc-900"
        >
          Products
        </Link>

        <button className="w-full rounded-xl px-5 py-4 text-left transition hover:bg-zinc-900">
          Orders
        </button>

        <button className="w-full rounded-xl px-5 py-4 text-left transition hover:bg-zinc-900">
          Customers
        </button>

        <button className="w-full rounded-xl px-5 py-4 text-left transition hover:bg-zinc-900">
          Banner
        </button>

        <button className="w-full rounded-xl px-5 py-4 text-left transition hover:bg-zinc-900">
          Voucher
        </button>

        <button className="w-full rounded-xl px-5 py-4 text-left transition hover:bg-zinc-900">
          Settings
        </button>

      </nav>

    </aside>
  );
}