import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap, toArray } from 'rxjs/operators';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  constructor(private auth: AuthService, private http: HttpClient) { }

  orders: any;

  ngOnInit(): void {
    this.http.get(environment.firebase + 'orders.json')
    .pipe(
        map((elem: any) => {
          const newArr = []
          for(let v in elem) {
            newArr.push({
              id: v,
              ...elem[v],
            })
          }
          return newArr;
        })
      )
    .subscribe(res => this.orders = res);
  }

}
