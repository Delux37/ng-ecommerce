import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  constructor(private cartService: CartService) { }
  get products() {
    return this.cartService.cartProducts;
  }

  updateAmount(id: string | undefined, amount: number) {
    this.cartService.updateAmount(id, amount); 
  }

  totalItems: number = this.cartService.getLength();

  ngOnInit(): void {

  }

}
