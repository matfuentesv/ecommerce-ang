export interface Products {
  name: string;
  price: number;
  discount: number;
  description: string;
  image: string;
  category: string;
  originalPrice: number;
  rating: string;
  reviews: number;
  quantity?: number;
}

export interface ProductsResponse {
  notebooks:Products[];
  cellPhones : Products[];
  coffeeMakers:Products[];
  airConditioning:Products[];
  outstanding: Products[];
}
