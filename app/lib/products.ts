export type Product = {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image: string;
  active: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    title: "PACHICO SIGNATURE",
    price: 129000,
    stock: 20,
    category: "Kaos",
    description: "Premium Streetwear",
    image: "/images/products/pachico-signature.jpg",
    active: true,
  },
];