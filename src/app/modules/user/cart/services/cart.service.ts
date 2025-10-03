import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCounter = signal(0);

  constructor(private http: HttpClient, private authService: AuthService) {}

  addProductToCart(productId: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'cart', {
      productId,
    });
  }

  updateProductQuantity(productId: string, count: number): Observable<any> {
    return this.http.put(environment.apiUrl + `cart/${productId}`, {
      count,
    });
  }

  getUserCart(): Observable<any> {
    return this.http.get(environment.apiUrl + 'cart');
  }

  removeItem(productId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `cart/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(environment.apiUrl + 'cart');
  }
}
