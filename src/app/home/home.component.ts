import { switchMap, map } from 'rxjs/operators';
import { CategoryService } from './../services/category.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activatedRoute: string = 'all'

  constructor(
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
  products: Product[] = [];
  categories$ = this.categoryService.fetchCategories()

  ngOnInit(): void {
    this.route.queryParams
    .pipe(
      switchMap(param => this.productsService.fetchProducts().pipe(
        map(products => {
          if(param?.cat){
            this.activatedRoute = param.cat
            return products.filter(product => product.category === param.cat);
          }else {
            this.activatedRoute = 'all';
            return products;
          }
        })
      ))
    ).subscribe(filteredProducts => this.products = filteredProducts)
  }

  filterByCat(category: string) {
    if(category) {
      this.router.navigate([], {
        queryParams: {
          cat: category
        }
      })
    }else {
      this.router.navigate([], {
        queryParams: {
        }
      })
    }
  }

}
