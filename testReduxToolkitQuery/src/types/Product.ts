export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  brand: string;
};

export type ProductsResponse = {
  products: Product[];
};
