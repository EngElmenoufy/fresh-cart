import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';
import { finalize, map, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (
    req.url.includes('cart') ||
    req.url.includes('wishlist') ||
    req.url.includes('checkout-session')
  ) {
    const authRequest = req.clone({
      setHeaders: {
        token: authService.getToken()!,
      },
    });

    return next(authRequest);
  }

  return next(req);
};
