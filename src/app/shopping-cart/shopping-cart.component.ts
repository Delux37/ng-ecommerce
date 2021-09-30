import { CartService } from './../services/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  constructor(private cartService: CartService) { }

  get products() {
    return this.cartService.cartProducts;
  }
  get totalItems (): number {
     return this.cartService.getLength();
  } 

  updateAmount(id: string | undefined, amount: number) {
    this.cartService.updateAmount(id, amount); 
  }

  totalPrice(): number {
    return this.cartService.totalPrice();
  }

  currentTotal(i: number): number {
    return this.cartService.cartProducts[i].amount * this.cartService.cartProducts[i].product.price;
  }

  clearShoppingCart() {
    this.cartService.clearCart();
  }
}
