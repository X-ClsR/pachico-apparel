"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Navbar from "@/app/components/Navbar";
import { CartContext } from "@/app/context/CartContext";
import { CheckoutContext } from "@/app/context/CheckoutContext";

export default function CheckoutPage() {

  const router = useRouter();

const cartContext = useContext(CartContext);

const checkoutContext = useContext(CheckoutContext);

if (!cartContext || !checkoutContext) return null;

const {
  cart,
  clearCart,
} = cartContext;

const { customer, setCustomer } = checkoutContext;


  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 0;

  const total = subtotal + shipping;
  async function handleCheckout() {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer,
      items: cart,
      subtotal,
      shipping,
      total,
    }),
  });

  if (!res.ok) {
    alert("Checkout gagal");
    return;
  }

  clearCart();

router.push("/checkout/success");
}

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-8 py-12 text-white">

        <div className="mx-auto max-w-6xl">

          <h1 className="mb-10 text-5xl font-black">
            CHECKOUT
          </h1>

          <div className="grid gap-10 lg:grid-cols-2">

            {/* ================= LEFT ================= */}

            <div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8">

                <h2 className="mb-8 text-2xl font-bold">
                  DATA PEMBELI
                </h2>

                <div className="space-y-5">

                  <input
                    placeholder="Nama Lengkap"
                    value={customer.fullName}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-zinc-900 p-4 outline-none"
                  />

                  <input
                    placeholder="Nomor HP"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        phone: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-zinc-900 p-4 outline-none"
                  />

                  <input
                    placeholder="Email"
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-zinc-900 p-4 outline-none"
                  />

                  <input
                    placeholder="Provinsi"
                    value={customer.province}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        province: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-zinc-900 p-4 outline-none"
                  />

                  <input
                    placeholder="Kota"
                    value={customer.city}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        city: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-zinc-900 p-4 outline-none"
                  />

                  <input
                    placeholder="Kecamatan"
                    value={customer.district}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        district: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-zinc-900 p-4 outline-none"
                  />

                  <input
                    placeholder="Kode Pos"
                    value={customer.postalCode}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        postalCode: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-zinc-900 p-4 outline-none"
                  />

                  <textarea
                    placeholder="Alamat Lengkap"
                    rows={5}
                    value={customer.address}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        address: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-zinc-900 p-4 outline-none"
                  />

                </div>

              </div>

            </div>

            {/* ================= RIGHT ================= */}

            <div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8">

                <h2 className="mb-8 text-2xl font-bold">
                  RINGKASAN PESANAN
                </h2>

                <div className="space-y-5">

                  {cart.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >

                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />

                      <div className="flex-1">

                        <p className="font-bold">
                          {item.title}
                        </p>

                        <p className="text-sm text-zinc-400">
                          {item.color} • {item.size}
                        </p>

                        <p className="text-sm">
                          Qty {item.quantity}
                        </p>

                      </div>

                      <p className="font-bold">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </p>

                    </div>

                  ))}

                </div>

                <hr className="my-8 border-zinc-800" />

                <div className="space-y-3">

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      Rp {subtotal.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Ongkir</span>
                    <span>
                      Rp {shipping.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between text-2xl font-bold">

                    <span>Total</span>

                    <span>
                      Rp {total.toLocaleString("id-ID")}
                    </span>

                  </div>

                </div>

                <button
  onClick={handleCheckout}
  className="mt-8 w-full rounded-xl bg-white py-4 font-bold text-black transition hover:scale-105"
>
  BAYAR SEKARANG
</button>

              </div>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}