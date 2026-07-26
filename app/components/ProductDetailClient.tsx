"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "@/app/context/CartContext";
import type { Product } from "@/app/types/product";

type Props = {
  product: Product;
};

export default function ProductDetailClient({ product }: Props) {
  
  const sizeList = product.sizes;

const [selectedSize, setSelectedSize] =
useState(sizeList[0]);
  const [quantity, setQuantity] = useState(1);
  const cartContext = useContext(CartContext);

if (!cartContext) return null;

const {
  addToCart,
} = cartContext;

const isOutOfStock = product.stock <= 0;

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <Image
          src={product.imageFront}
          alt={product.title}
          width={700}
          height={700}
          className="w-full rounded-xl"
        />

        <div>
          <p className="text-zinc-400">{product.category}</p>

          <h1 className="mt-2 text-5xl font-bold">
            {product.title}
          </h1>
          

          <p className="mt-6 text-3xl font-bold">
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <p className="mt-2 text-sm text-zinc-400">
  Stock tersedia :{" "}
  <span className="font-bold">
    {product.stock}
  </span>
</p>

          <p className="mt-6">
            <strong>Material :</strong> {product.material}
          </p>

          <p className="mt-2">
            <strong>Print :</strong> {product.printMethod}
          </p>

          <div className="mt-8">
  <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
    Warna
  </p>

  <div className="inline-flex rounded-full border border-zinc-700 px-5 py-2">
    Black
  </div>
</div>

          <div className="mt-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
              Size
            </p>

            <div className="flex gap-3">
              {sizeList.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-11 w-11 rounded-full text-sm font-semibold transition-all ${
                    selectedSize === size
                      ? "bg-white text-black"
                      : "bg-zinc-800 text-white hover:bg-zinc-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8">
  <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
    Jumlah
  </p>

  <div className="flex items-center gap-4">

  <button
    disabled={quantity <= 1}
    onClick={() => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }}
    className={`flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold ${
      quantity <= 1
        ? "cursor-not-allowed bg-zinc-700 text-zinc-500"
        : "bg-zinc-800 text-white hover:bg-zinc-700"
    }`}
  >
    -
  </button>

  <span className="w-8 text-center text-xl font-bold">
    {quantity}
  </span>

  <button
    disabled={quantity >= product.stock}
    onClick={() => {
      if (quantity < product.stock) {
        setQuantity(quantity + 1);
      }
    }}
    className={`flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold ${
      quantity >= product.stock
        ? "cursor-not-allowed bg-zinc-700 text-zinc-500"
        : "bg-zinc-800 text-white hover:bg-zinc-700"
    }`}
  >
    +
  </button>

  <p className="ml-4 text-sm text-zinc-500">
    Stock tersedia : {product.stock}
  </p>

</div>
</div>

          <button
  disabled={isOutOfStock}
  onClick={() =>
    addToCart({
      id: product.id,
      title: product.title,
      color: "Default",
      size: selectedSize,
      quantity,
      price: product.price,
      image: product.imageFront,
      stock: product.stock,
    })
  }
  className={`mt-10 rounded-lg px-8 py-4 font-bold transition ${
    isOutOfStock
      ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
      : "bg-white text-black hover:scale-105"
  }`}
>
  {isOutOfStock
    ? "STOK HABIS"
    : "TAMBAH KE KERANJANG"}
</button>
        </div>
      </div>
    </main>
  );
}