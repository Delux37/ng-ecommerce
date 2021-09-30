import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(private http: HttpClient, private auth: AuthService) { }

  orders: any;

  ngOnInit(): void {
    this.auth.currentUser.pipe(
      map(user => user?.token),
      switchMap(token => this.http.get(environment.firebase + 'orders.json')
      .pipe(
        map((orders: any) => {
          const myOrders = [];
          for(let order  in orders){
            if(orders[order].userId === token)
              myOrders.push(orders[order]);
            }
            return myOrders;
        })
      ))
    )
    .subscribe(v => this.orders = v);
  }

}
