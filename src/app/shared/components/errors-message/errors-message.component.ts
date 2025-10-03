import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-errors-message',
  imports: [TitleCasePipe],
  templateUrl: './errors-message.component.html',
  styleUrl: './errors-message.component.css',
})
export class ErrorsMessageComponent {
  @Input({ required: true }) control!: AbstractControl | null;
  @Input() label: string = 'input';
}
