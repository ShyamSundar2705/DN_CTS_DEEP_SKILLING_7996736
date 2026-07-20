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
    loadComponent: () => import('./pages/courses-layout/courses-layout').then(m => m.CoursesLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/course-list/course-list').then(m => m.CourseList)
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/course-details/course-details').then(m => m.CourseDetails)
      }
    ]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/student-profile/student-profile').then(m => m.StudentProfile),
    canActivate: [authGuard]
  },
  {
    path: 'enroll',
    loadChildren: () => import('./features/enrollment/enrollment.routes').then(m => m.ENROLLMENT_ROUTES),
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
