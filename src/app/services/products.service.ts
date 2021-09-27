import { Product } from './../models/product.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http
      .get<{ [key: string]: Product }>(environment.data + 'products.json')
      .pipe(
        map((products) => {
          const productsArr = [];
          for (const key in products) {
            productsArr.push({
              id: key,
              ...products[key],
            });
          }
          return productsArr;
        })
      );
  }
  one(id: string) {
    return this.http.get<{ [key: string]: Product }>(
      environment.data + 'products/' + id + '.json'
    );
  }
  updateProduct(id: string, product: Product) {
    return this.http.put(environment.data + 'products/' + id + '.json', {
      ...product
    })
  }
}
