import Image from "next/image";
import Link from "next/link";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition duration-300 hover:-translate-y-2 hover:border-white hover:shadow-2xl">
      <div className="mb-6 overflow-hidden rounded-lg">
        <Image
          src={product.imageFront}
          alt={product.title}
          width={600}
          height={600}
          className="h-52 w-full object-cover transition duration-500 hover:scale-110"
        />
      </div>

      <h2 className="text-2xl font-bold text-white">
        {product.title}
      </h2>

      <p className="mt-2 text-zinc-400">
        {product.category}
      </p>

      <p className="mt-4 text-lg font-semibold text-white">
        Rp {product.price.toLocaleString("id-ID")}
      </p>

      <p className="mt-2 text-sm text-zinc-400">
        🧵 {product.material}
      </p>

      <p className="mt-1 text-sm text-zinc-400">
        🎨 {product.printMethod}
      </p>

      <Link
        href={`/product/${product.slug}`}
        className="mt-6 block w-full rounded-lg border border-white py-3 text-center text-white transition hover:bg-white hover:text-black"
      >
        LIHAT PRODUK
      </Link>
    </div>
  );
}