import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import CartDrawer from "./components/CartDrawer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductSection />
      <CartDrawer />
    </>
  );
}