import { CategoryService } from './../../../services/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Product } from './../../../models/product.model';
import { ProductsService } from './../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  currentProduct!: Product;
  form!: FormGroup;

  categories: string[] = []

  constructor(
    private route: ActivatedRoute,
    private prod: ProductsService,
    private cat: CategoryService
  ) {}

  fetchCategories() {
    if(!this.categories.length) {
      this.cat.fetchCategories()
      .subscribe(categories => this.categories = categories);
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(),
      price: new FormControl(),
      category: new FormControl(),
      imageUrl: new FormControl(),
    });

    this.route.params
      .pipe(
        map((param: any) => {
          return { id: param.id };
        }),
        switchMap((param: { id: string }) =>
          this.prod.one(param.id).pipe(
            map((product) => {
              return { ...product, ...param };
            })
          )
        )
      )
      .subscribe((product) => {
        this.currentProduct = <Product>product;
        this.form.setValue({
          title: this.currentProduct.title,
          price: this.currentProduct.price,
          imageUrl: this.currentProduct.imageUrl,
          category: this.currentProduct.category,
        });
      });
  }

  onSubmit() {
    const product: Product = {
      title: this.form.get('title')?.value,
      price: this.form.get('price')?.value,
      category: this.form.get('category')?.value,
      imageUrl: this.form.get('imageUrl')?.value,
    };
    this.prod.updateProduct(this.currentProduct.id!, product)
    .subscribe(res => console.log(res))
  }
}
