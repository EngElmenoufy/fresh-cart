import { AbstractControl } from '@angular/forms';

export const mismatch = (control: AbstractControl) => {
  if (control.get('password')?.value !== control.get('rePassword')?.value) {
    return { mismatch: true };
  }
  return null;
};
