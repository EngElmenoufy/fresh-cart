import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.interface';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CartService } from '../../../cart/services/cart.service';
import { FilterPipe } from '../../../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { MainHeaderComponent } from '../../../../../shared/components/main-header/main-header.component';
import { ResponsiveComponent } from '../../../../../shared/components/responsive/responsive.component';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    ProductCardComponent,
    FilterPipe,
    MainHeaderComponent,
    ResponsiveComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  @Input() sliceTo: number | undefined = undefined;
  @Input() isPopularHeader: boolean = false;
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  products: Product[] = [];
  search: string = '';
  wishlistProductsId: string[] = [];

  ngOnInit(): void {
    this.getAllProducts();
    this.getUserWishlist();
  }

  getUserWishlist() {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res: any) => {
        this.wishlistProductsId = res.data.map(
          (product: Product) => product._id
        );
      },
    });
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onAddToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res: any) => {
        this.cartService.cartCounter.set(res.numOfCartItems);
      },
    });
  }
}
