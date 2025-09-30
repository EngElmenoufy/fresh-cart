import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private router = inject(Router);
  private id = inject(PLATFORM_ID);
  // private cookieService = inject(CookieService);

  register(body: any) {
    return this.http.post(environment.apiUrl + 'auth/signup', body);
  }

  login(body: any) {
    return this.http.post(environment.apiUrl + 'auth/signin', body);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.id)) {
      return localStorage.getItem('token');
    }
    return '';
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    // this.cookieService.set('token', token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    if (isPlatformBrowser(this.id)) {
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
    }
  }
}
