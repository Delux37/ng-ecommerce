import { Product } from './../../../models/product.model';
import { ProductsService } from './../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  currentProduct!: Product;

  constructor(private route: ActivatedRoute, private prod: ProductsService) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((param: any) => {
          return { id: param.id }
        }),
        switchMap((param: { id: string }) =>
        
          this.prod.one(param.id).pipe(
            map((product) => {
              return { ...product, ...param };
            })
          )
        )
      )
      .subscribe(product => {this.currentProduct = <Product>product});
  }
}
