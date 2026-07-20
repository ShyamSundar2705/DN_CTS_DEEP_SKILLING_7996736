import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectAllCourses } from '../course/course.selectors';
import { EnrollmentState } from './enrollment.reducer';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledCourseIds = createSelector(
  selectEnrollmentState,
  (state) => state.enrolledCourseIds
);

// Cross-slice selector: combines the course and enrollment feature states
// to return full Course objects instead of just the enrolled ids.
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledCourseIds,
  (courses, enrolledCourseIds) => courses.filter(course => enrolledCourseIds.includes(course.id))
);
