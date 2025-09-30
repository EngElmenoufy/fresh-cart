import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { IsLoadingService } from '../services/is-loading.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  const isLoadingService = inject(IsLoadingService);

  isLoadingService.isLoading.set(true);
  spinner.show();

  return next(req).pipe(
    finalize(() => {
      spinner.hide();
      isLoadingService.isLoading.set(false);
    })
  );
};
