import Link from "next/link";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden hover:border-white transition"
    >
      <img
        src={product.imageFront}
        alt={product.title}
        className="aspect-square w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold text-white">
          {product.title}
        </h2>

        <p className="mt-2 text-zinc-400">
          {product.category}
        </p>

        <p className="mt-4 text-2xl font-bold text-white">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </Link>
  );
}