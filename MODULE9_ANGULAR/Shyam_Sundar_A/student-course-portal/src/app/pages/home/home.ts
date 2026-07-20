import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { Notification } from '../../components/notification/notification';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses } from '../../store/course/course.selectors';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-home',
  imports: [FormsModule, AsyncPipe, CourseSummaryWidget, Notification],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';

  courseCount$: Observable<number>;
  enrolledCount$: Observable<number>;

  constructor(private store: Store) {
    this.courseCount$ = this.store.select(selectAllCourses).pipe(map(courses => courses.length));
    this.enrolledCount$ = this.store.select(selectEnrolledCourses).pipe(map(courses => courses.length));
  }

  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    this.store.dispatch(loadCourses({}));
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}
