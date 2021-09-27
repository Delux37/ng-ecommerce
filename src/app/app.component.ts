import { CartService } from './services/cart.service';
import { AuthUserModel } from './auth/auth.user.model';
import { AuthService } from './auth/auth.service';
import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDropdownShown = false;
  currentUser: AuthUserModel | null = null;

  // cartAmount
  get length(): number {
    return this.cartService.getLength();
  }

  constructor(private authService: AuthService,
              private cartService: CartService
      ) {  }
  ngOnInit() {
    this.authService.currentUser.subscribe(
      res => this.currentUser = res
    )
    this.authService.autoLogin();
  };
}
