import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { StudentProfile } from './pages/student-profile/student-profile';
import { EnrollmentForm } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { AddCourse } from './pages/add-course/add-course';
import { CourseDetails } from './pages/course-details/course-details';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'courses',
    component: CourseList
  },
  {
    path: 'courses/:id',
    component: CourseDetails
  },
  {
    path: 'profile',
    component: StudentProfile
  },
  {
    path: 'enroll',
    component: EnrollmentForm
  },
  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentForm
  },
  {
    path: 'add-course',
    component: AddCourse
  }
];