"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/app/context/CartContext";

export default function CartDrawer() {
  const cartContext = useContext(CartContext);

  if (!cartContext) return null;

  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = cartContext;

  if (!cartOpen) return null;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 z-40 bg-black/60"
      />

      <div className="fixed right-0 top-0 z-50 flex h-screen w-[430px] flex-col bg-zinc-950 text-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <h2 className="text-2xl font-bold">
            Keranjang
          </h2>

          <button
            onClick={() => setCartOpen(false)}
            className="text-3xl"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          {cart.length === 0 && (
            <p className="text-zinc-500">
              Keranjang masih kosong.
            </p>
          )}

          {cart.map((item) => (
            <div
              key={`${item.id}-${item.color}-${item.size}`}
              className="mb-5 flex gap-4 border-b border-zinc-800 pb-5"
            >

              <Image
                src={item.image}
                alt={item.title}
                width={90}
                height={90}
                className="rounded-lg object-cover"
              />

              <div className="flex-1">

                <h3 className="font-bold">
                  {item.title}
                </h3>

                <p className="text-sm text-zinc-500">
                  {item.color}
                </p>

                <p className="text-sm text-zinc-500">
                  Size {item.size}
                </p>

                <p className="mt-2 font-bold">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>

                <div className="mt-3 flex items-center gap-3">

                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item.id,
                        item.color,
                        item.size
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded bg-zinc-800"
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.id,
                        item.color,
                        item.size
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded bg-zinc-800"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      removeFromCart(
                        item.id,
                        item.color,
                        item.size
                      )
                    }
                    className="ml-auto text-red-500"
                  >
                    Hapus
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

        <div className="border-t border-zinc-800 p-6">

          <div className="mb-5 flex justify-between text-xl font-bold">
            <span>Total</span>

            <span>
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>

          <Link
            href="/checkout"
            onClick={() => setCartOpen(false)}
            className="block rounded-xl bg-white py-4 text-center font-bold text-black"
          >
            CHECKOUT
          </Link>

        </div>

      </div>
    </>
  );
}