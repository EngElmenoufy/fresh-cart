import { IsLoadingService } from './../../../../../core/services/is-loading.service';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MainHeaderComponent } from '../../../../../shared/components/main-header/main-header.component';
import { Product } from '../../../products/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { WishlistCardComponent } from '../../../../../shared/components/list-card/list-card.component';
import { ToastrService } from 'ngx-toastr';
import { PageEmptyComponent } from '../../../../../shared/components/page-empty/page-empty.component';

@Component({
  selector: 'app-cart-list',
  imports: [
    MainHeaderComponent,
    CurrencyPipe,
    WishlistCardComponent,
    PageEmptyComponent,
  ],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css',
})
export class CartListComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  readonly isLoadingService = inject(IsLoadingService);

  products: any[] = [];
  numOfCartItems: number = 0;
  totalCartPrice: number = 0;

  ngOnInit(): void {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.setData(res);
      },
    });
  }

  onChangeQty(item: { productId: string; quantity: number }) {
    this.cartService
      .updateProductQuantity(item.productId, item.quantity)
      .subscribe({
        next: (res: any) => {
          this.setData(res);
        },
      });
  }

  setData(res: any) {
    this.numOfCartItems = res.numOfCartItems;
    this.products = res.data.products;
    console.log(this.products);
    this.totalCartPrice = res.data.totalCartPrice;
  }

  onRemoveItem(productId: string) {
    this.cartService.removeItem(productId).subscribe({
      next: (res: any) => {
        this.setData(res);
        this.cartService.cartCounter.set(res.numOfCartItems);
        this.toastr.warning('Product removed successfully from your cart');
      },
    });
  }

  clearCartData() {
    this.products = [];
    this.numOfCartItems = 0;
    this.totalCartPrice = 0;
    this.cartService.cartCounter.set(0);
  }

  onClearCart() {
    this.cartService.clearCart().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      complete: () => {
        this.clearCartData();
      },
    });
  }
}
