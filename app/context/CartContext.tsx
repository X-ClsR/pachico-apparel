"use client";

import {
  createContext,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id: number;
  title: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

type CartContextType = {
  cart: CartItem[];

  cartOpen: boolean;

  setCartOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  addToCart: (item: CartItem) => void;

  removeFromCart: (
    id: number,
    color: string,
    size: string
  ) => void;

  increaseQuantity: (
    id: number,
    color: string,
    size: string
  ) => void;

  decreaseQuantity: (
    id: number,
    color: string,
    size: string
  ) => void;
   clearCart: () => void;
  
};

export const CartContext =
  createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] =
    useState(false);

  function addToCart(item: CartItem) {
    setCart((prev) => {
      const exist = prev.find(
        (i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.size === item.size
      );

      if (exist) {
        return prev.map((i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.size === item.size
            ? {
                ...i,
                quantity:
                  i.quantity + item.quantity,
              }
            : i
        );
      }

      return [...prev, item];
    });

    
  }

  function removeFromCart(
    id: number,
    color: string,
    size: string
  ) {
    setCart((prev) =>
      prev.filter(
        (i) =>
          !(
            i.id === id &&
            i.color === color &&
            i.size === size
          )
      )
    );
  }

  function increaseQuantity(
    id: number,
    color: string,
    size: string
  ) {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id &&
        i.color === color &&
        i.size === size
          ? {
              ...i,
              quantity: i.quantity + 1,
            }
          : i
      )
    );
  }

  function decreaseQuantity(
    id: number,
    color: string,
    size: string
  ) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id &&
          i.color === color &&
          i.size === size
            ? {
                ...i,
                quantity: i.quantity - 1,
              }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }
function clearCart() {
  setCart([]);
}
  return (
    <CartContext.Provider
      value={{
  cart,
  cartOpen,
  setCartOpen,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}}
    >
      {children}
    </CartContext.Provider>
  );
}