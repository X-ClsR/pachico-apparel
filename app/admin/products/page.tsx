import { Suspense } from "react";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">

        <Suspense fallback={<div>Loading Form...</div>}>
          <ProductForm />
        </Suspense>

        <Suspense fallback={<div>Loading Products...</div>}>
          <ProductList />
        </Suspense>

      </div>
    </main>
  );
}