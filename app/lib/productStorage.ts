export type Product = {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image?: string;
};

const STORAGE_KEY = "pachico_products";

export function getProducts(): Product[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveProduct(product: Product) {
  const products = getProducts();

  products.push(product);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(products)
  );
}

export function deleteProduct(id: number) {
  const products = getProducts().filter(
    (product) => product.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(products)
  );
}

export function updateProduct(product: Product) {
  const products = getProducts().map((item) =>
    item.id === product.id ? product : item
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(products)
  );
}

export function getProductById(id: number) {
  return getProducts().find(
    (product) => product.id === id
  );
}