import { AuthService } from './../../../modules/auth/services/auth.service';
import {
  Component,
  computed,
  HostListener,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CartService } from '../../../modules/user/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() isAuth = false;
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  cartCounter = computed(() => this.cartService.cartCounter());
  isMenuOpened = signal(false);

  // HIGHLIGHT

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.getUserCart();
    }
  }

  getUserCart() {
    this.cartService.getUserCart().subscribe({
      next: (res: any) => {
        this.cartService.cartCounter.set(res.numOfCartItems);
      },
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (window.outerWidth >= 768) {
      this.isMenuOpened.set(false);
    }
  }

  onToggleMenu() {
    this.isMenuOpened.update((prev) => !prev);
  }

  onLogout() {
    this.authService.logout();
  }
}

// import { Component, inject, Input, OnInit, signal } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { AuthService } from '../../../modules/auth/services/auth.service';
// import { CartService } from '../../../modules/user/cart/services/cart.service';
// import { TranslatePipe } from '@ngx-translate/core';

// @Component({
//   selector: 'app-navbar',
//   imports: [RouterLink, TranslatePipe],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.css',
// })
// export class NavbarComponent implements OnInit {
//   @Input() isAuth = false;
//   private readonly authService = inject(AuthService);
//   private readonly cartService = inject(CartService);
//   cartCounter!: number;

//   isClickedMenu = signal(false);

//   ngOnInit(): void {
//     this.cartService.cartCounter.subscribe({
//       next: (value) => {
//         this.cartCounter = value;
//       },
//     });

//     if (this.authService.isLoggedIn()) {
//       this.cartService.getUserCart().subscribe({
//         next: (res: any) => {
//           this.cartService.cartCounter.next(res.numOfCartItems);
//         },
//       });
//     }
//   }

//   onToggleMenu() {
//     this.isClickedMenu.update((value) => !value) !this.isClickedMenu;
//   }

//   onLogout() {
//     this.authService.logout();
//   }
// }
