export type OrderItem = {
  id: number;
  title: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

export type Customer = {
  fullName: string;
  phone: string;
  email: string;

  province: string;
  city: string;
  district: string;
  postalCode: string;

  address: string;
};

export type Order = {
  id: string;

  createdAt: string;

  status:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "EXPIRED";

  customer: Customer;

  items: OrderItem[];

  subtotal: number;

  shipping: number;

  total: number;
};

const orders: Order[] = [];

export function generateOrderId() {
  const now = new Date();

  const y = now.getFullYear();

  const m = String(now.getMonth() + 1).padStart(2, "0");

  const d = String(now.getDate()).padStart(2, "0");

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `PCH-${y}${m}${d}-${random}`;
}

export function saveOrder(order: Order) {
  orders.unshift(order);
}

export function getOrders() {
  return orders;
}

export function getOrderById(id: string) {
  return orders.find(
    (order) => order.id === id
  );
}