import { createReducer, on } from '@ngrx/store';

import { Course } from '../../models/course.model';
import { loadCourses, loadCoursesFailure, loadCoursesSuccess } from './course.actions';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

export const courseReducer = createReducer(
  initialCourseState,
  on(loadCourses, (state): CourseState => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadCoursesSuccess, (state, { courses }): CourseState => ({
    ...state,
    courses,
    loading: false,
    error: null,
  })),
  on(loadCoursesFailure, (state, { error }): CourseState => ({
    ...state,
    loading: false,
    error,
  }))
);
