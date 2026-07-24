import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <ProductForm />
        <ProductList />
      </div>
    </main>
  );
}