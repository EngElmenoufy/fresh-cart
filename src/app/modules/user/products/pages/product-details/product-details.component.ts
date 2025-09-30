import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  product: Product = {} as Product;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param: any) => {
        this.getProductDetails(param.get('id'));
      },
    });
  }

  getProductDetails(productId: string) {
    this.productsService.getSpecificProduct(productId).subscribe({
      next: (res: any) => {
        this.product = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
