import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./pages/product-details/product-details.component').then(
        (c) => c.ProductDetailsComponent
      ),
  },
];
