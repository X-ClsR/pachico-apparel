"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  material: string;
  printMethod: string;
  imageFront: string;
  sizes: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  async function loadProducts() {
    const res = await fetch("/api/products", {
      cache: "no-store",
    });

    const data = await res.json();
    setProducts(data);
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus produk?")) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Gagal menghapus produk");
      return;
    }

    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl bg-[#353839] p-7">

      <div className="mb-7 flex items-center justify-between">

        <h2 className="text-3xl font-bold text-[#FFFAF0]">
          Daftar Produk
        </h2>

        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 rounded-xl bg-[#111111] px-4 py-3 text-[#FFFAF0] outline-none"
        />

      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-800">

        <table className="w-full border-collapse text-left text-sm">

          <thead>
            <tr className="border-b border-zinc-800 bg-[#111111] text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3 font-medium">Produk</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium">Material</th>
              <th className="px-4 py-3 font-medium">Print</th>
              <th className="px-4 py-3 font-medium">Ukuran</th>
              <th className="px-4 py-3 font-medium">Harga</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (

              <tr
                key={product.id}
                className="border-b border-zinc-800 last:border-0 hover:bg-[#111111]/60"
              >

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">

                    <img
                      src={product.imageFront || "/placeholder-product.png"}
                      alt={product.title}
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-bold text-[#FFFAF0]">
                        {product.title}
                      </p>
                      <p className="text-xs text-zinc-500">#{product.id}</p>
                    </div>

                  </div>
                </td>

                <td className="px-4 py-3 text-zinc-300">{product.category}</td>
                <td className="px-4 py-3 text-zinc-300">{product.material}</td>
                <td className="px-4 py-3 text-zinc-300">{product.printMethod}</td>
                <td className="px-4 py-3 text-zinc-300">{product.sizes}</td>

                <td className="px-4 py-3 font-bold text-[#FFFAF0]">
                  Rp {product.price.toLocaleString("id-ID")}
                </td>

                <td className="px-4 py-3 text-zinc-300">{product.stock} pcs</td>

                <td className="px-4 py-3">
                  {product.stock > 10 ? (
                    <span className="rounded-lg bg-green-600 px-3 py-1 text-xs font-bold whitespace-nowrap">
                      READY
                    </span>
                  ) : product.stock > 0 ? (
                    <span className="rounded-lg bg-yellow-500 px-3 py-1 text-xs font-bold text-black whitespace-nowrap">
                      STOCK MENIPIS
                    </span>
                  ) : (
                    <span className="rounded-lg bg-red-600 px-3 py-1 text-xs font-bold whitespace-nowrap">
                      SOLD OUT
                    </span>
                  )}
                </td>

                <td className="relative px-4 py-3 text-right">

                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === product.id ? null : product.id
                      )
                    }
                    className="rounded-lg border border-zinc-700 px-3 py-1.5 text-[#FFFAF0]"
                  >
                    ⋮
                  </button>

                  {openMenu === product.id && (
                    <div className="absolute right-4 top-11 z-10 w-40 rounded-xl border border-zinc-700 bg-[#1b1b1b] p-2 text-left shadow-2xl">

                      <Link
                        href={`/admin/products?id=${product.id}`}
                        className="block rounded-lg px-3 py-2 text-yellow-400 hover:bg-zinc-800"
                      >
                        ✏ Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="mt-1 w-full rounded-lg px-3 py-2 text-left text-red-500 hover:bg-zinc-800"
                      >
                        🗑 Hapus
                      </button>

                    </div>
                  )}

                </td>

              </tr>

            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-10 text-center text-sm text-zinc-500"
                >
                  Belum ada produk yang cocok.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}