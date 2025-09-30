import { Component, Input } from '@angular/core';
import { ErrorsMessageComponent } from '../errors-message/errors-message.component';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [ErrorsMessageComponent, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  // @Input() inputData!: {
  //   title: string;
  //   type: string;
  // };
  // @Input() control!: AbstractControl;
}
