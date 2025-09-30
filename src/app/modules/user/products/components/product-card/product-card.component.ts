import { WishlistService } from './../../../wishlist/services/wishlist.service';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { CardComponent } from '../../../../../shared/components/card/card.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, CardComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnChanges {
  @Input({ required: true }) product: Product = {} as Product;
  @Input() loggedWishlistProductsId: string[] = [];
  @Output() addToCart = new EventEmitter<string>();
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly wishlistService = inject(WishlistService);

  isProductInWishlist: boolean = false;

  ngOnChanges(): void {
    if (this.loggedWishlistProductsId.includes(this.product._id)) {
      this.isProductInWishlist = true;
    }
  }

  onClickedProduct(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if (element.tagName !== 'BUTTON' && element.tagName !== 'I') {
      this.router.navigate(['/product-details', this.product._id]);
    }
  }

  onAddToCart() {
    this.addToCart.emit(this.product._id);
  }

  onAddOrRemoveProductToWishlist() {
    if (!this.isProductInWishlist) {
      this.wishlistService.addProductToWishlist(this.product.id).subscribe({
        next: (res: any) => {
          this.isProductInWishlist = true;
          this.toastr.success(res.message);
        },
      });
    } else {
      this.wishlistService
        .removeProductFromWishlist(this.product.id)
        .subscribe({
          next: (res: any) => {
            this.isProductInWishlist = false;
            this.toastr.warning(res.message);
          },
        });
    }
  }
}
