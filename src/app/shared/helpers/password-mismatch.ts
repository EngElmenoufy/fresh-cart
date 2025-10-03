// import { mismatch } from './password-mismatch';
import { AbstractControl } from '@angular/forms';

export const mismatch = (control: AbstractControl) => {
  if (control.get('password')?.value !== control.get('rePassword')?.value) {
    control.get('rePassword')?.setErrors({
      mismatch: true,
    });
    return { mismatch: true };
  }
  return null;
};
