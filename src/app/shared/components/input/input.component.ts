import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorsMessageComponent } from '../errors-message/errors-message.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, ErrorsMessageComponent, TitleCasePipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() label: string = 'input';
  @Input() type: string = 'text';

  @Input() control!: any;
}
