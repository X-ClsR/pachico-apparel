import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-white p-6 text-white">
      <h1>{product.title}</h1>
      <p>{product.price}</p>
    </div>
  );
}