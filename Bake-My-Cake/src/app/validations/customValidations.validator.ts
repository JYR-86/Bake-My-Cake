import { AbstractControl, ValidatorFn } from '@angular/forms';
export class CustomValidation {
  static checkAge(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const age = control.value;

      if (age && (isNaN(age) || age < 18)) {
        return { invalidAge: true }; // You can customize the error key and value
      }

      return null;
    };
  }
  static passwordMatch(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        return { 'passwordMismatch': true };
      }

      return null;
    };
  }

  
}
