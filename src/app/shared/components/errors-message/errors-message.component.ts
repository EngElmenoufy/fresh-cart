import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-errors-message',
  imports: [],
  templateUrl: './errors-message.component.html',
  styleUrl: './errors-message.component.css',
})
export class ErrorsMessageComponent {
  @Input({ required: true }) control!: AbstractControl | null;
}
