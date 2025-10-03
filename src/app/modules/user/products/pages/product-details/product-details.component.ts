import { CartService } from './../../../cart/services/cart.service';
import { WishlistService } from './../../../wishlist/services/wishlist.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.interface';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { sliderOptions } from '../../../../../shared/helpers/slider-options';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  imagesSliderOptions: OwlOptions = sliderOptions();
  private readonly toastr = inject(ToastrService);

  product: Product = {} as Product;

  ngOnInit(): void {
    this.getProductId();

    this.imagesSliderOptions.autoplay = false;
  }

  getProductId(): void {
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
    });
  }

  onAddToCart() {
    this.cartService.addProductToCart(this.product._id).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.cartService.cartCounter.set(res.numOfCartItems);
          this.toastr.success(res.message);
        }
      },
    });
  }

  onAddToWishlist() {
    this.wishlistService.addProductToWishlist(this.product._id).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.toastr.success(res.message);
        }
      },
    });
  }
}
