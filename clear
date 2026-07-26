import ProductCard from "./ProductCard";

type Product = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  price: number;

  stock: number;

  material: string;
  printMethod: string;

  imageFront: string;
  imageBack: string;

  sizes: string[];
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil produk");
  }

  return res.json();
}

export default async function ProductSection() {
  const products = await getProducts();

  return (
    <section className="bg-black px-6 py-20">
      <h2 className="mb-12 text-center text-4xl font-bold text-white">
        OUR PRODUCTS
      </h2>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}