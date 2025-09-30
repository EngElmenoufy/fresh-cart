import { Component, Input, model } from '@angular/core';
import { Brand } from '../../../modules/user/brands/models/brand.interface';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  animations: [
    // Modal slide
    trigger('modal', [
      transition(':enter', [
        style({ transform: 'translateY(-200px)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-200px)' })),
      ]),
    ]),
  ],
})
export class ModalComponent {
  @Input() brand: Brand | null = null;

  isOpened = model(false);

  onCloseModal(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if (
      element.classList.contains('fixed') ||
      element.tagName === 'BUTTON' ||
      element.tagName === 'I'
    ) {
      this.isOpened.set(false);
      this.brand = null;
    }
  }
}
