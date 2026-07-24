export default function StatsCards() {
  return (
    <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-sm text-zinc-500">Revenue</p>
        <h2 className="mt-3 text-4xl font-black">Rp0</h2>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-sm text-zinc-500">Orders</p>
        <h2 className="mt-3 text-4xl font-black">0</h2>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-sm text-zinc-500">Products</p>
        <h2 className="mt-3 text-4xl font-black">0</h2>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-sm text-zinc-500">Customers</p>
        <h2 className="mt-3 text-4xl font-black">0</h2>
      </div>

    </div>
  );
}