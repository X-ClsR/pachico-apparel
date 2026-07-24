"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";

export default function ProductForm() {
  const router = useRouter();
const searchParams = useSearchParams();
const id = searchParams.get("id");
useEffect(() => {
  if (!id) return;

  async function loadProduct() {
    const res = await fetch(`/api/products/${id}`);
    const product = await res.json();

    setTitle(product.title);
    setSlug(product.slug);
    setCategory(product.category);
    setDescription(product.description);
    setPrice(String(product.price));
    setMaterial(product.material);
    setPrintMethod(product.printMethod);
    setImageFront(product.imageFront);
    setImageBack(product.imageBack);
    setSizes(product.sizes);
  }

  loadProduct();
}, [id]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [material, setMaterial] = useState("");
  const [printMethod, setPrintMethod] = useState("");
  const [imageFront, setImageFront] = useState("");
  const [imageBack, setImageBack] = useState("");
  const [sizes, setSizes] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
  !title ||
  !slug ||
  !category ||
  !description ||
  !price ||
  !material ||
  !printMethod ||
  !imageFront ||
  !imageBack ||
  !sizes
) {
  alert("Semua field wajib diisi.");
  return;
}

if (Number(price) <= 0) {
  alert("Harga harus lebih dari 0.");
  return;
}

    const res = await fetch(
  id ? `/api/products/${id}` : "/api/products",
  {
    method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        title,
        category,
        description,
        price: Number(price),
        material,
        printMethod,
        imageFront,
        imageBack,
        sizes,
      }),
    });

    if (!res.ok) {
      alert("Gagal menyimpan produk");
      return;
    }

    alert(id ? "Produk berhasil diupdate" : "Produk berhasil ditambahkan");

    router.push("/admin/products");
router.refresh();

setTitle("");
setSlug("");
setCategory("");
setDescription("");
setPrice("");
setMaterial("");
setPrintMethod("");
setImageFront("");
setImageBack("");
setSizes("");
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-8"
    >
      <h2 className="text-2xl font-bold">
        Tambah Produk
      </h2>

      <input
      required
        placeholder="Nama Produk"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-lg bg-zinc-900 p-3"
      />

      <input
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full rounded-lg bg-zinc-900 p-3"
      />

      <input
        placeholder="Kategori"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-lg bg-zinc-900 p-3"
      />

      <input
        placeholder="Harga"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full rounded-lg bg-zinc-900 p-3"
      />

      <input
        placeholder="Material"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className="w-full rounded-lg bg-zinc-900 p-3"
      />

      <input
        placeholder="Print Method"
        value={printMethod}
        onChange={(e) => setPrintMethod(e.target.value)}
        className="w-full rounded-lg bg-zinc-900 p-3"
      />

      <div className="space-y-3">
        <label className="font-bold">Image Front</label>

        <ImageUploader
          onUpload={(url: string) => setImageFront(url)}
        />

        {imageFront && (
          <img
            src={imageFront}
            alt="Front"
            className="h-40 rounded-xl object-cover"
          />
        )}
      </div>

      <div className="space-y-3">
        <label className="font-bold">Image Back</label>

        <ImageUploader
          onUpload={(url: string) => setImageBack(url)}
        />

        {imageBack && (
          <img
            src={imageBack}
            alt="Back"
            className="h-40 rounded-xl object-cover"
          />
        )}
      </div>

      <input
        placeholder="Sizes (M,L,XL)"
        value={sizes}
        onChange={(e) => setSizes(e.target.value)}
        className="w-full rounded-lg bg-zinc-900 p-3"
      />

      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-lg bg-zinc-900 p-3"
      />

      <button
  type="submit"
  className="w-full rounded-xl bg-white py-3 font-bold text-black hover:bg-zinc-300 transition"
>
  {id ? "UPDATE PRODUK" : "SIMPAN PRODUK"}
</button>
    </form>
  );
}