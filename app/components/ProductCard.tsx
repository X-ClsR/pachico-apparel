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
    return (
  <div className="rounded-xl border border-white p-6 text-white">
    <p>{product.title}</p>

    <Image
      src={product.imageFront}
      alt={product.title}
      width={200}
      height={200}
    />
  </div>
);
}