export interface Product{
    id? :string;
    category: string;
    imageUrl: string;
    price: number;
    title: string;
  }

export interface CartProducts extends Product  {
  amount: number;
}