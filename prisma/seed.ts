import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.create({
    data: {
      slug: "pachico-signature",
      title: "PACHICO SIGNATURE",
      category: "KAOS",
      description: "Premium Streetwear T-Shirt",
      price: 129000,
      material: "Cotton Combed 24s",
      printMethod: "Premium DTF",

      imageFront:
        "/images/products/kaos/pachico-signature-black/front.png",

      imageBack:
        "/images/products/kaos/pachico-signature-black/back.png",

      sizes: "M,L,XL,XXL",
    },
  });

  console.log("✅ Product seeded.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });