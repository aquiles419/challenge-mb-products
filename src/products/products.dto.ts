export type ProductsDTO = {
  id?: string;
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
