import { ForgotPasswordService } from './../../services/forgot-password.service';
import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly forgotPasswordService = inject(ForgotPasswordService);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  currentStep: WritableSignal<number> = signal<number>(1);
  forgotPasswordForm!: FormGroup;
  isLoading = false;

  constructor() {
    effect(() => {
      this.setForm(this.currentStep());
    });
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(step: number = 1): void {
    switch (step) {
      case 1:
        this.forgotPasswordForm = this.fb.group({
          email: [null, [Validators.required, Validators.email]],
        });
        break;
      case 2:
        this.forgotPasswordForm = this.fb.group({
          resetCode: [null, [Validators.required]],
        });
        break;
      case 3:
        this.forgotPasswordForm = this.fb.group({
          email: [null, [Validators.required, Validators.email]],
          newPassword: [
            null,
            [
              Validators.required,
              Validators.pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
              ),
            ],
          ],
        });
        break;
    }
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) return;
    switch (this.currentStep()) {
      case 1:
        this.forgotPasswordService
          .forgotPassword(this.forgotPasswordForm.value)
          .subscribe({
            next: (res: any) => {
              if (res.statusMsg === 'success') {
                this.toastr.success(res.message);
              } else {
                this.toastr.error(res.message);
              }
            },
            complete: () => {
              this.currentStep.set(2);
            },
          });
        break;
      case 2:
        this.forgotPasswordService
          .verifyResetCode(this.forgotPasswordForm.value)
          .subscribe({
            complete: () => {
              this.currentStep.set(3);
            },
          });
        break;
      case 3:
        this.forgotPasswordService
          .resetPassword(this.forgotPasswordForm.value)
          .subscribe({
            next: (res: any) => {
              this.authService.saveToken(res.token);
            },
            complete: () => {
              this.router.navigate(['/']);
            },
          });
        break;
    }
  }
}
