import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly http = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this.http.get(environment.apiUrl + 'categories');
  }

  getSpecificCategory(categoryId: string) {
    return this.http.get(environment.apiUrl + `categories/${categoryId}`);
  }

  getAllSubCategoriesOnCategory(categoryId: string) {
    return this.http.get(
      environment.apiUrl + `categories/${categoryId}/subcategories`
    );
  }
}
