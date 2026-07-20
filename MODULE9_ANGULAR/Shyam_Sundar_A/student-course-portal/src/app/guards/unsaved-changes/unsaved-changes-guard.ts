import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }

  return window.confirm('You have unsaved changes. Leave?');
};
