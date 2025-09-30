import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../modules/user/products/models/product.interface';

@Component({
  selector: 'app-list-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css',
})
export class WishlistCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() count!: number;
  @Input() price!: number;
  @Input() hasChangeQuantity: boolean = false;
  @Output() addToCart = new EventEmitter<string>();
  @Output() removeItem = new EventEmitter<string>();
  @Output() changeQty = new EventEmitter<{
    productId: string;
    quantity: number;
  }>();

  get productPrice(): number {
    return this.product.price || this.price;
  }

  onRemoveItem() {
    this.removeItem.emit(this.product._id);
  }

  onAddToCart() {
    this.addToCart.emit(this.product._id);
  }

  onChangeQty(quantity: number) {
    this.changeQty.emit({ productId: this.product._id, quantity: quantity });
  }
}
