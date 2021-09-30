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
  updateAmount(id: string | undefined, amount: number) {
    const curr = this.cartProducts.find(p => p.product.id === id);
    if(curr){
      curr.amount += amount;
      if(curr.amount <= 0){
        this.cartProducts.splice(this.cartProducts.indexOf(curr), 1)
      }
    }
  }
  checkAmount(id: string ) {
    const prod = this.cartProducts.find(p => p.product.id === id);
    return prod ? prod.amount : 0;
  }
  totalPrice(): number {
    return this.cartProducts.map(p => p.product.price * p.amount).reduce((acc, curr) => acc + curr, 0);
  }
  totalAmount(): number{
    return this.cartProducts.map(p => p.amount).reduce((acc, curr) => acc + curr, 0);
  }
  clearCart(): void {
    this.cartProducts.splice(0, this.cartProducts.length);
  }
  
}
