import { CategoryService } from './../services/category.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private productsService: ProductsService) { }
  products$ = this.productsService.fetchProducts()
  categories$ = this.categoryService.fetchCategories()

  ngOnInit(): void {
    
  }

}
