import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { authGuard } from './guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/course-list/course-list').then(m => m.CourseList)
  },
  {
    path: 'courses/:id',
    loadComponent: () => import('./pages/course-details/course-details').then(m => m.CourseDetails)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/student-profile/student-profile').then(m => m.StudentProfile),
    canActivate: [authGuard]
  },
  {
    path: 'enroll',
    loadComponent: () => import('./pages/enrollment-form/enrollment-form').then(m => m.EnrollmentForm),
    canActivate: [authGuard]
  },
  {
    path: 'enroll-reactive',
    loadComponent: () => import('./pages/reactive-enrollment-form/reactive-enrollment-form').then(m => m.ReactiveEnrollmentForm),
    canActivate: [authGuard]
  },
  {
    path: 'add-course',
    loadComponent: () => import('./pages/add-course/add-course').then(m => m.AddCourse),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound)
  }
];
