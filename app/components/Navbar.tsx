"use client";

import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "@/app/context/CartContext";

export default function Navbar() {
  const cartContext = useContext(CartContext);

  if (!cartContext) return null;

  const { cart, setCartOpen } = cartContext;

  const totalItem = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="sticky top-0 z-30 border-b border-zinc-800 bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-2xl font-black tracking-[0.3em] text-white"
        >
          PACHICO
        </Link>

        <div className="flex items-center gap-8">

          <Link
            href="/"
            className="text-zinc-300 hover:text-white"
          >
            Shop
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative text-2xl"
          >
            🛒

            {totalItem > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {totalItem}
              </span>
            )}
          </button>

        </div>

      </div>
    </nav>
  );
}