import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private readonly http = inject(HttpClient);

  forgotPassword(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/forgotPasswords', body);
  }

  verifyResetCode(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/verifyResetCode', body);
  }

  resetPassword(body: any): Observable<any> {
    return this.http.put(environment.apiUrl + 'auth/resetPassword', body);
  }
}
