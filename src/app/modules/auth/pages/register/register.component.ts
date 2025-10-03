import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ErrorsMessageComponent } from '../../../../shared/components/errors-message/errors-message.component';
import { mismatch } from '../../../../shared/helpers/password-mismatch';
import { AuthService } from '../../services/auth.service';
import { InputComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    ErrorsMessageComponent,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private token!: string;
  isLoading = false;

  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
        Validators.required,
      ]),
      rePassword: new FormControl(''),
    },
    { validators: mismatch }
  );

  onSubmit() {
    if (this.registerForm.valid) {
      // this.registerForm.markAllAsTouched()
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          this.token = res.token;
          if (res.message === 'success') {
            this.router.navigate(['/login']);
            this.isLoading = false;
          }
          this.registerForm.reset();
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
