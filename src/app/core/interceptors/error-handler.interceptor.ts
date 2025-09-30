import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (err.error instanceof ErrorEvent) {
        errorMessage = `Client error ${err.error.message}`;
      } else {
        switch (err.status) {
          case 400:
            errorMessage = 'Bad request: Please check your inputs';
            break;
          case 401:
            errorMessage = 'Unauthorized: Please login again';
            break;
          case 403:
            errorMessage =
              'Forbidden: You do not have permission to access this resource';
            break;
          case 404:
            errorMessage = 'Not Found: The requested resource was not found';
            break;
          case 500:
            errorMessage = 'Internal Server Error: Please try again later';
            break;
          case 503:
            errorMessage =
              'Service Unavailable: Server is temporarily unavailable';
            break;
          default:
            errorMessage = `Server Error: ${err.status} — ${err.message}`;
        }
      }

      console.error('HTTP Error', {
        status: err.status,
        message: errorMessage,
        url: req.url,
        error: err,
      });

      toastr.error(errorMessage, 'Error');

      return throwError(() => new Error(errorMessage));
    })
  );
};
