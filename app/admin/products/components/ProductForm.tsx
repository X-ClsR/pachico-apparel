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
    setStock(String(product.stock));
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
  useEffect(() => {

if(id) return;

setSlug(

title
.toLowerCase()
.replace(/\s+/g,"-")
.replace(/[^\w-]/g,"")

);

},[title,id]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [material, setMaterial] = useState("");
  const [printMethod, setPrintMethod] = useState("");
  const [imageFront, setImageFront] = useState("");
  const [imageBack, setImageBack] = useState("");
  const [sizes, setSizes] = useState("");
  const [stock, setStock] = useState("0");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
  !title ||
  !slug ||
  !category ||
  !description ||
  !price ||
  !stock ||
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

    console.log({
      slug,
      title,
      price,
      stock,
    });
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
        stock: Number(stock),
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
setStock("0");
setMaterial("");
setPrintMethod("");
setSizes("");
  }
  return (
    <form
  onSubmit={handleSubmit}
  className="rounded-2xl bg-[#353839] p-8"
>
      <h2 className="text-2xl font-bold">
  {id ? "Edit Produk" : "Tambah Produk"}
</h2>
<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

</div>
      <input
      required
        placeholder="Nama Produk"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl border border-zinc-600 bg-[#111111] px-4 py-3 text-[#FFFAF0] outline-none focus:border-white"
      />

      <input
placeholder="Slug Produk"
value={slug}
readOnly
className="w-full rounded-xl border border-[#4B4F54] bg-[#222222] p-4 text-zinc-400"
/>

      <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full rounded-xl border border-[#4B4F54] bg-[#111111] p-4 text-[#FFFAF0] outline-none"
>
  <option value="">Pilih Kategori</option>
  <option value="Oversize">Oversize</option>
  <option value="Regular">Regular</option>
  <option value="Hoodie">Hoodie</option>
  <option value="Jersey">Jersey</option>
</select>

      <input
        placeholder="Harga"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full rounded-xl border border-zinc-600 bg-[#111111] px-4 py-3 text-[#FFFAF0] outline-none focus:border-white"
      />
      <div className="space-y-2">
  <label className="text-sm font-semibold">
    Stock
  </label>

  <input
    type="number"
    value={stock}
    onChange={(e) => setStock(e.target.value)}
    className="w-full rounded-xl border border-zinc-600 bg-[#111111] px-4 py-3 text-[#FFFAF0]"
    placeholder="Stock Produk"
  />
</div>

      <select
  value={material}
  onChange={(e) => setMaterial(e.target.value)}
  className="w-full rounded-xl border border-[#4B4F54] bg-[#111111] p-4 text-[#FFFAF0] outline-none"
>
  <option value="">Pilih Material</option>

  <option value="Cotton Combed 24s">
    Cotton Combed 24s
  </option>

  <option value="Cotton Combed 30s">
    Cotton Combed 30s
  </option>

  <option value="Heavy Cotton">
    Heavy Cotton
  </option>

  <option value="Baby Terry">
    Baby Terry
  </option>
</select>

      <select
  value={printMethod}
  onChange={(e) => setPrintMethod(e.target.value)}
  className="w-full rounded-xl border border-[#4B4F54] bg-[#111111] p-4 text-[#FFFAF0] outline-none"
>
  <option value="">Pilih Print Method</option>

  <option value="DTF">DTF</option>

  <option value="Screen Print">
    Screen Print
  </option>

  <option value="Embroidery">
    Embroidery
  </option>
</select>

      <div className="rounded-xl border border-zinc-700 bg-[#111111] p-4">
        <label className="mb-3 block text-sm font-semibold text-zinc-300">Image Front (Opsional)</label>

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

      <div className="rounded-xl border border-zinc-700 bg-[#111111] p-4">
        <label className="mb-3 block text-sm font-semibold text-zinc-300">Image Front (Opsional)</label>

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

      <div className="space-y-3">

<label className="font-bold">
Ukuran
</label>

<div className="flex flex-wrap gap-4">

{["M","L","XL","XXL"].map((size)=>{

const checked = sizes
.split(",")
.includes(size);

return(

<label
key={size}
className="flex items-center gap-2 rounded-lg border border-[#4B4F54] px-4 py-2 cursor-pointer"
>

<input
type="checkbox"
checked={checked}
onChange={(e)=>{

const current=sizes
? sizes.split(",")
: [];

let updated=current;

if(e.target.checked){

updated=[...current,size];

}else{

updated=current.filter(
(s)=>s!==size
);

}

setSizes(updated.join(","));

}}
/>

{size}

</label>

);

})}

</div>

</div>

      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[140px] w-full rounded-xl border border-zinc-600 bg-[#111111] px-4 py-3 text-[#FFFAF0]"
      />
    

      <div className="flex gap-3 pt-2">
  <button
    type="submit"
    className="rounded-lg bg-[#FFFAF0] px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
  >
    Simpan
  </button>

  <button
    type="reset"
    className="rounded-lg border border-zinc-700 px-5 py-2 text-sm font-semibold text-[#FFFAF0] hover:bg-zinc-800"
  >
    Reset
  </button>
</div>
    </form>
  );
}