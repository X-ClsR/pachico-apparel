import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div className="border border-red-500 p-6 text-white">
      <img
        src={product.imageFront}
        alt={product.title}
        width={300}
        height={300}
      />

      <h2>{product.title}</h2>

      <p>Rp {product.price}</p>
    </div>
  );
}