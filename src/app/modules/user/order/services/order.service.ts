import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './../../../auth/services/auth.service';
import { environment } from '../../../../../environments/environment.development';
import { ShippingAddress } from '../models/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createOrder(cartId: string, shippingAddress: ShippingAddress) {
    this.http.post(
      environment.apiUrl + `orders/checkout-session/${cartId}`,
      {
        shippingAddress,
      },
      {
        headers: {
          token: this.authService.getToken()!,
        },
      }
    );
  }
}
