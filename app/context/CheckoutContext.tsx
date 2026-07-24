"use client";

import { createContext, useState } from "react";

export type CustomerData = {
  fullName: string;
  phone: string;
  email: string;

  province: string;
  city: string;
  district: string;
  postalCode: string;

  address: string;
};

type CheckoutContextType = {
  customer: CustomerData;

  setCustomer: React.Dispatch<
    React.SetStateAction<CustomerData>
  >;
};

export const CheckoutContext =
  createContext<CheckoutContextType | null>(null);

export function CheckoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [customer, setCustomer] =
    useState<CustomerData>({
      fullName: "",
      phone: "",
      email: "",

      province: "",
      city: "",
      district: "",
      postalCode: "",

      address: "",
    });

  return (
    <CheckoutContext.Provider
      value={{
        customer,
        setCustomer,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}