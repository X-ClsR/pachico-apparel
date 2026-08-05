import { Suspense } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#111111] text-[#FFFAF0]">

      <div className="mx-auto max-w-7xl p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-black">
              Products
            </h1>

            <p className="mt-1 text-sm text-zinc-400">
              Kelola seluruh produk Pachico Apparel
            </p>
          </div>

        </div>

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">

          <div className="rounded-2xl bg-[#353839] p-6 shadow-lg">

            <Suspense fallback={<div>Loading...</div>}>
              <ProductForm />
            </Suspense>

          </div>

          <div className="rounded-2xl bg-[#353839] p-6 shadow-lg">

            <Suspense fallback={<div>Loading...</div>}>
              <ProductList />
            </Suspense>

          </div>

        </div>

      </div>

    </main>
  );
}