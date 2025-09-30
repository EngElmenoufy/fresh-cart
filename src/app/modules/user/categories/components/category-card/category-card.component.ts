import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardComponent } from '../../../../../shared/components/card/card.component';
import { Category } from '../../../../../core/models/category.interface';

@Component({
  selector: 'app-category-card',
  imports: [CardComponent],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  @Input({ required: true }) category!: Category;
  @Output() getSubtitle = new EventEmitter<string>();

  onClickCard(event: MouseEvent) {
    this.getSubtitle.emit(this.category._id);
  }
}
