import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';
import { Course } from '../../models/course.model';
import { NotificationService } from '../../services/notification/notification';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard, Highlight],
  providers: [NotificationService],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {

  searchTerm = '';
  selectedCourseId: number | null = null;

  courses$: Observable<Course[]>;
  error$: Observable<string | null>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loading$ = this.store.select(selectCoursesLoading);

    this.courses$ = this.store.select(selectAllCourses).pipe(
      tap(courses => {
        if (courses.length) {
          this.notificationService.notify('Course Loaded');
        }
      })
    );

    this.error$ = this.store.select(selectCoursesError).pipe(
      tap(error => {
        if (error) {
          this.notificationService.notify('Error Loading Course');
        }
      })
    );
  }

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.queryParamMap.get('q') ?? '';
    this.store.dispatch(loadCourses({ searchTerm: this.searchTerm || undefined }));
  }

  onSearch(term: string): void {
    this.searchTerm = term;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: term || null },
      queryParamsHandling: 'merge',
    });

    this.store.dispatch(loadCourses({ searchTerm: term || undefined }));
  }

  // trackBy keeps the list keyed by course id, so *ngFor patches only cards whose data changed
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
  }
}
