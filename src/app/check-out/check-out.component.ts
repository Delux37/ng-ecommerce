import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  form!: FormGroup;
  cartItems!: any;
  get totalAmount() {
    return this.cart.totalAmount();
  }
  get totalPrice() {
    return this.cart.totalPrice();
  }
  
  constructor(private cart: CartService,
              private auth: AuthService,
              private http: HttpClient,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.cartItems = this.cart.cartProducts;
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'address1': new FormControl(null, Validators.required),
      'address2': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
    })
  }
  onSubmit() {
    this.auth.currentUser
    .pipe(
      switchMap(user => 
        this.http.post(environment.firebase + 'orders.json', {
          userId: user?.token,
          name: this.form.get('name')?.value,
          address1: this.form.get('address1')?.value,
          address2: this.form.get('address2')?.value,
          city: this.form.get('city')?.value,
          purchased: this.cartItems
        })
      )
    )
    .subscribe((res: any) => {
      this.cart.clearCart();
      this.form.reset();
      this.router.navigate([`/order-succesful/${res.name}`])
    })
  }
}
