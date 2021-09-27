import { CartService } from './../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

  }

  addToCart() {
    this.cartService.addProducts(this.product);
  }
  getAmount(): number {
    const id = this.product.id ? this.product.id : '';
    return this.cartService.checkAmount(id);
  }

  updateAmount(amount: number) {
    const id = this.product.id ? this.product.id : '';
    this.cartService.updateAmount(this.product.id, amount); 
  }
}
