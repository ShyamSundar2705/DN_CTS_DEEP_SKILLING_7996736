import { Routes } from '@angular/router';

import { unsavedChangesGuard } from '../../guards/unsaved-changes/unsaved-changes-guard';

export const ENROLLMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../pages/enrollment-form/enrollment-form').then(m => m.EnrollmentForm),
  },
  {
    path: 'reactive',
    loadComponent: () => import('../../pages/reactive-enrollment-form/reactive-enrollment-form').then(m => m.ReactiveEnrollmentForm),
    canDeactivate: [unsavedChangesGuard],
  },
];
