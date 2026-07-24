"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
};

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const res = await fetch("/api/products", {
        cache: "no-store",
      });

      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id: number) {
    const ok = confirm("Hapus produk ini?");

    if (!ok) return;

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  }

  if (loading) {
    return (
      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
      <h2 className="mb-6 text-2xl font-bold">
        Daftar Produk
      </h2>

      {products.length === 0 ? (
        <p className="text-zinc-500">
          Belum ada produk.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-4 text-left">
                  Produk
                </th>

                <th className="text-left">
                  Harga
                </th>

                <th className="text-left">
                  Kategori
                </th>

                <th className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-zinc-900"
                >
                  <td className="py-5 font-semibold">
                    {item.title}
                  </td>

                  <td>
                    Rp{" "}
                    {item.price.toLocaleString("id-ID")}
                  </td>

                  <td>{item.category}</td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/admin/products?id=${item.id}`}
                        className="rounded-lg bg-yellow-500 px-4 py-2 font-bold text-black"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
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
        </div>
      )}
    </div>
  );
}