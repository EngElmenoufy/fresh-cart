import { Component, inject, OnInit } from '@angular/core';
import { MainHeaderComponent } from '../../../../../shared/components/main-header/main-header.component';
import { Product } from '../../../products/models/product.interface';
import { CartService } from './../../../cart/services/cart.service';
import { WishlistService } from './../../services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistCardComponent } from '../../../../../shared/components/list-card/list-card.component';
import { RouterLink } from '@angular/router';
import { IsLoadingService } from '../../../../../core/services/is-loading.service';
import { PageEmptyComponent } from '../../../../../shared/components/page-empty/page-empty.component';

@Component({
  selector: 'app-wish-list',
  imports: [
    MainHeaderComponent,
    WishlistCardComponent,
    RouterLink,
    PageEmptyComponent,
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  readonly isLoadingService = inject(IsLoadingService);
  products: Product[] = [];

  ngOnInit(): void {
    this.getLoggedWishlist();
  }

  getLoggedWishlist() {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res: any) => {
        this.products = res.data;
      },
    });
  }

  onRemoveItem(productId: string) {
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res: any) => {
        this.toastr.warning(res.message);
        this.filterWishlist(res.data);
      },
    });
  }

  filterWishlist(productsId: string[] | string) {
    this.products = this.products.filter((product) => {
      return typeof productsId === 'string'
        ? product._id !== productsId
        : productsId.includes(product._id);
    });
  }

  onAddToCart(productId: string) {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.cartService.cartCounter.set(res.numOfCartItems);
      },
      complete: () => {
        this.onRemoveItem(productId);
      },
    });
  }
}
