import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-empty',
  imports: [RouterLink],
  templateUrl: './page-empty.component.html',
  styleUrl: './page-empty.component.css',
})
export class PageEmptyComponent {
  title: InputSignal<string> = input.required();
}
