import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
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
