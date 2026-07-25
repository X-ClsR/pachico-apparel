"use client";

import { FaTimes } from "react-icons/fa";

type Order = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  total: number;
  status: string;
  trackingNumber: string | null;

  items: {
    id: number;
    title: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
  }[];
};

export default function OrderDetailModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-3xl rounded-2xl bg-zinc-950 p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-black">
            Order #{order.id}
          </h2>

          <button onClick={onClose}>
            <FaTimes size={22} />
          </button>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          <div>

            <h3 className="mb-3 font-bold">
              Customer
            </h3>

            <p>{order.fullName}</p>
            <p>{order.phone}</p>
            <p>{order.email}</p>

          </div>

          <div>

            <h3 className="mb-3 font-bold">
              Alamat
            </h3>

            <p>{order.address}</p>
            <p>{order.district}</p>
            <p>{order.city}</p>
            <p>{order.province}</p>
            <p>{order.postalCode}</p>

          </div>

        </div>

        <div className="mt-8">

          <h3 className="mb-3 font-bold">
            Item
          </h3>

          <div className="space-y-3">

            {order.items.map((item) => (

              <div
                key={item.id}
                className="flex justify-between rounded-xl bg-zinc-900 p-4"
              >

                <div>

                  <p className="font-bold">
                    {item.title}
                  </p>

                  <p className="text-zinc-500">
                    {item.color} • {item.size}
                  </p>

                </div>

                <div className="text-right">

                  <p>Qty {item.quantity}</p>

                  <p>
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="mt-8 flex justify-between border-t border-zinc-800 pt-6">

          <div>

            <p>Status</p>

            <h3 className="font-bold">
              {order.status}
            </h3>

          </div>

          <div>

            <p>Resi</p>

            <h3 className="font-bold">
              {order.trackingNumber ?? "-"}
            </h3>

          </div>

          <div>

            <p>Total</p>

            <h2 className="text-3xl font-black">
              Rp {order.total.toLocaleString("id-ID")}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}