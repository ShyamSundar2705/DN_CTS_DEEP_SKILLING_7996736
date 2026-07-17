import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export const simulateEmailCheck: AsyncValidatorFn = (
  control: AbstractControl<string>
): Observable<ValidationErrors | null> => {
  return new Observable(observer => {
    const timer = setTimeout(() => {
      const emailTaken = (control.value ?? '').includes('test@');
      observer.next(emailTaken ? { emailTaken: true } : null);
      observer.complete();
    }, 800);

    return () => clearTimeout(timer);
  });
};
