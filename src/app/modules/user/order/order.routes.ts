import { Routes } from '@angular/router';

export const ORDER_ROUTES: Routes = [
  {
    path: 'address/:cartId',
    loadComponent: () =>
      import('./pages/address/address.component').then(
        (c) => c.AddressComponent
      ),
    title: 'Address',
  },
];
