import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './../../../auth/services/auth.service';
import { environment } from '../../../../../environments/environment';
import { ShippingAddress } from '../models/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(cartId: string, shippingAddress: any) {
    return this.http.post(
      environment.apiUrl +
        `orders/checkout-session/${cartId}?url=${environment.baseUrl}`,
      {
        shippingAddress,
      }
    );
  }
}
