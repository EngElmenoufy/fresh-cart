import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly http = inject(HttpClient);

  addProductToWishlist(productId: string) {
    return this.http.post(environment.apiUrl + 'wishlist', {
      productId,
    });
  }

  removeProductFromWishlist(productId: string) {
    return this.http.delete(environment.apiUrl + `wishlist/${productId}`);
  }

  getLoggedUserWishlist() {
    return this.http.get(environment.apiUrl + 'wishlist');
  }
}
