import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      const config = {
          'required': 'Required',
          'invalidCreditCard': 'Is invalid credit card number',
          'invalidEmailAddress': 'Invalid email address',
          'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
          'minlength': `Minimum length ${validatorValue.requiredLength}`
      };

      return config[validatorName];
  }

  static passwordValidator(control) {
      // {6,100}           - Assert password is between 6 and 100 characters
      // (?=.*[0-9])       - Assert a string has at least one number (?=.*[#?!@$%^&*\-\_])
      if (control.value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/)) {
          return null;
      } else {
          return { 'invalidPassword': true };
      }
  }
}
