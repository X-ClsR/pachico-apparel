import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pachico.co.id"),
  title: {
    default: "PACHICO | Premium Streetwear Apparel",
    template: "%s | PACHICO",
  },
  description:
    "Pachico Apparel — brand streetwear lokal dengan kualitas premium: kaos, hoodie, jersey, dan koleksi apparel eksklusif lainnya.",
  keywords: [
    "pachico",
    "streetwear",
    "kaos distro",
    "hoodie premium",
    "apparel lokal",
    "baju streetwear indonesia",
  ],
  openGraph: {
    title: "PACHICO | Premium Streetwear Apparel",
    description:
      "Brand streetwear lokal dengan kualitas premium: kaos, hoodie, jersey, dan koleksi apparel eksklusif lainnya.",
    url: "https://pachico.co.id",
    siteName: "PACHICO",
    images: [
      {
        url: "/images/logo/pachico-logo.png",
        width: 512,
        height: 512,
        alt: "Pachico Apparel",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PACHICO | Premium Streetwear Apparel",
    description:
      "Brand streetwear lokal dengan kualitas premium: kaos, hoodie, jersey, dan koleksi apparel eksklusif lainnya.",
    images: ["/images/logo/pachico-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <CheckoutProvider>
            {children}
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  );
}