import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccesfulComponent } from './order-succesful/order-succesful.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './auth/login/login.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthAlertComponent } from './auth/auth-alert/auth-alert.component';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';
import { EditProductComponent } from './admin/admin-products/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccesfulComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    DropdownComponent,
    SignupComponent,
    AuthAlertComponent,
    LoadingSpinnerComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'order-succesful', component: OrderSuccesfulComponent },
      { path: 'auth/login', component:  LoginComponent},
      { path: 'auth/signup', component:  SignupComponent}, 
      { path: 'admin/products', component:  AdminProductsComponent, },
      { path: 'admin/products/:id', component: EditProductComponent, },
      { path: 'admin/orders', component:  AdminOrdersComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
