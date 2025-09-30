import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Output() clickCard = new EventEmitter();

  onClicked(event: MouseEvent) {
    this.clickCard.emit(event);
  }
}
