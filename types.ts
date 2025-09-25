
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface OrderItem extends Product {
  quantity: number;
}
