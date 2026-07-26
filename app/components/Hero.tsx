export default function Hero() {
  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center bg-black px-6 text-center text-white">

      <h1 className="text-7xl font-bold tracking-widest">
        PACHICO
      </h1>

      <p className="mt-6 max-w-xl text-xl text-zinc-400">
        Premium Streetwear Apparel
      </p>

      <p className="mt-3 text-zinc-500">
        Crafted For The Bold
      </p>

      <a
  href="#products"
  className="mt-10 rounded-md border border-white px-8 py-3 transition hover:bg-white hover:text-black"
>
  SHOP NOW
</a>

    </section>
  );
}