interface Product {
  quantity: number;
  price: number;
  id: number;
  total_price: number;
}

export interface CartItem {
  products: Product[];
  cart_total_price: number;
}