"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  material: string;
  printMethod: string;
  imageFront: string;
  sizes: string;
};
export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  async function loadProducts() {
    const res = await fetch("/api/products", {
      cache: "no-store",
    });

    const data = await res.json();

    setProducts(data);
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm("Yakin ingin menghapus produk?");

    if (!confirmDelete) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Gagal menghapus produk.");
      return;
    }

    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);
const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase()) ||
  product.category.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
      <h2 className="mb-6 text-2xl font-bold">
        Daftar Produk
      </h2>
      <input
  type="text"
  placeholder="Cari produk..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mb-6 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-white"
/>

      {products.length === 0 ? (
        <p className="text-zinc-500">
          Belum ada produk.
        </p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="py-4 text-left">Produk</th>
<th className="text-left">Kategori</th>
<th className="text-left">Material</th>
<th className="text-left">Print</th>
<th className="text-left">Ukuran</th>
<th className="text-left">Harga</th>
<th className="text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-zinc-900"
              >
                <td className="py-4">
  <div className="flex items-center gap-4">
    <img
      src={product.imageFront}
      alt={product.title}
      className="h-16 w-16 rounded-xl object-cover border border-zinc-800"
    />

    <div>
      <p className="font-semibold">
        {product.title}
      </p>

      <p className="text-xs text-zinc-500">
        #{product.id}
      </p>
    </div>
  </div>
</td>

                <td>{product.category}</td>

<td>{product.material}</td>

<td>{product.printMethod}</td>

<td>{product.sizes}</td>

<td className="font-bold">
  Rp {product.price.toLocaleString("id-ID")}
</td>

<td>
  {/* tombol edit delete nanti */}
</td>

                <td>
                  Rp {product.price.toLocaleString("id-ID")}
                </td>

                <td>
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/admin/products?id=${product.id}`}
                      className="rounded-lg bg-yellow-500 px-4 py-2 font-bold text-black"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 font-bold"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}