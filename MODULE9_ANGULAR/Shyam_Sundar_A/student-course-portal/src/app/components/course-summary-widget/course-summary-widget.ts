import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { CourseService } from '../../services/course/course';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-summary-widget',
  imports: [AsyncPipe],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css',
})
export class CourseSummaryWidget {

  // Reads the same NgRx store slice Home reads from, proving the store is a singleton:
  // adding a course here updates both this widget and the Home page stat instantly.
  totalCourses$: Observable<number>;

  constructor(
    private courseService: CourseService,
    private store: Store
  ) {
    this.totalCourses$ = this.store.select(selectAllCourses).pipe(map(courses => courses.length));
  }

  addSampleCourse(): void {
    this.store.select(selectAllCourses).pipe(
      take(1),
      switchMap(courses => {
        const nextId = courses.length + 1;
        return this.courseService.addCourse({
          name: `Sample Course ${nextId}`,
          code: `SMP${nextId}01`,
          credits: 3,
          gradeStatus: 'pending',
        });
      })
    ).subscribe(() => this.store.dispatch(loadCourses({})));
  }
}
