export type Product = {
  id: number;
  slug: string;

  title: string;
  category: string;

  price: number;
  stock:number;

  material: string;
  printMethod: string;

  description: string;

  imageFront: string;
  imageBack: string;

  sizes: string[];

  createdAt?: Date;
  updatedAt?: Date;
};