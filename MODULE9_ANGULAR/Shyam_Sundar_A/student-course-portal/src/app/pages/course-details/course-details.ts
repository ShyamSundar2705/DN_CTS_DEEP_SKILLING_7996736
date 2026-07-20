import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { CourseService } from '../../services/course/course';
import { NotificationService } from '../../services/notification/notification';

@Component({
  selector: 'app-course-details',
  imports: [NgIf, AsyncPipe, RouterLink, CreditLabelPipe],
  providers: [NotificationService],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {

  hasError = false;

  course$: Observable<Course | null>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private notificationService: NotificationService
  ) {
    this.course$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => {
        if (!id || Number.isNaN(id)) {
          this.hasError = true;
          return of(null);
        }

        this.hasError = false;
        return this.courseService.getCourseById(id).pipe(
          tap(() => this.notificationService.notify('Course Loaded')),
          catchError(() => {
            this.hasError = true;
            this.notificationService.notify('Error Loading Course');
            return of(null);
          })
        );
      })
    );
  }
}
