import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../../../../../shared/components/card/card.component';
import { Brand } from '../../models/brand.interface';

@Component({
  selector: 'app-brand-card',
  imports: [CardComponent],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.css',
})
export class ListCardComponent {
  @Input({ required: true }) brand!: Brand;
  @Output() brandDetails = new EventEmitter<string>();

  onClickedBrand() {
    this.brandDetails.emit(this.brand._id);
  }
}
