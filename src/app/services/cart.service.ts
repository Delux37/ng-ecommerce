import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProducts: [{ product: Product, amount: number }] = [] as any;

  constructor() { }

  addProducts(product: Product) { 
    const prod = this.cartProducts.find(p => p.product.id === product.id)
    if(prod) {
      prod.amount++;
    }else {
      this.cartProducts.push({ product, amount: 1 });
    }
  }
  getLength() {
    return this.cartProducts.map(res => res.amount).reduce((acc, curr) => acc + curr, 0);
  }
  
}
