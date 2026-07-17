import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noCourseCode(control: AbstractControl<string>): ValidationErrors | null {
  const value = (control.value ?? '').toUpperCase();
  return value.startsWith('XX') ? { noCourseCode: true } : null;
}
