import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { CourseService } from '../../services/course/course';
import { loadCourses, loadCoursesFailure, loadCoursesSuccess } from './course.actions';

@Injectable()
export class CourseEffects {

  // Declared as fields (not constructor params) so they're assigned, in order,
  // before loadCourses$'s initializer runs and reads them.
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      switchMap(({ searchTerm }) =>
        (searchTerm ? this.courseService.searchCourses(searchTerm) : this.courseService.getCourses()).pipe(
          map(courses => loadCoursesSuccess({ courses })),
          catchError(error => of(loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );
}
