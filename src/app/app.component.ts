import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private translate = inject(TranslateService);

  title = 'fresh-cart';
  id = inject(PLATFORM_ID);

  constructor() {
    this.translate.addLangs(['ar', 'en', 'fr']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      localStorage.setItem('name', 'fresh-cart');
    }
  }
}
