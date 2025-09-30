import { Routes } from '@angular/router';

import { UserLayoutComponent } from '../../layouts/user-layout/user-layout.component';
import { PRODUCTS_ROUTES } from './products/products.routes';
import { CART_ROUTES } from './cart/cart.routes';
import { ORDER_ROUTES } from './order/order.routes';
import { HOME_ROUTES } from './home/home.routes';
import { BRANDS_ROUTES } from './brands/brands.routes';
import { CATEGORIES_ROUTES } from './categories/categories.routes';
import { WISHLIST_ROUTES } from './wishlist/wishlist.routes';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      ...HOME_ROUTES,
      ...PRODUCTS_ROUTES,
      ...CART_ROUTES,
      ...ORDER_ROUTES,
      ...BRANDS_ROUTES,
      ...CATEGORIES_ROUTES,
      ...WISHLIST_ROUTES,
    ],
  },
];
