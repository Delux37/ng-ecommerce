import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  fetchCategories() {
    return this.http.get<{[key: string]: string}>(environment.data + 'categories.json')
    .pipe(
      map(category => {
        return Object.keys(category)
      }),
    )
  }


}
