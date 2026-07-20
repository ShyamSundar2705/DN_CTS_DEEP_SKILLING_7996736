import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AsyncPipe, NgClass, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledCourseIds } from '../../store/enrollment/enrollment.selectors';

interface EnrollmentState {
  enrolled: boolean;
}

@Component({
  selector: 'app-course-card',
  imports: [AsyncPipe, NgClass, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, CreditLabelPipe, RouterLink],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges, OnInit {

  @Input()
  course!: Course;

  @Output()
  enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  // Wrapped in an object so `| async as` still renders when enrolled is false
  // (a bare `false` would be treated as falsy by *ngIf and hide the card).
  enrollment$!: Observable<EnrollmentState>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.enrollment$ = this.store.select(selectEnrolledCourseIds).pipe(
      map(enrolledCourseIds => ({ enrolled: enrolledCourseIds.includes(this.course.id) }))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Previous course value:', changes['course'].previousValue);
      console.log('Current course value:', changes['course'].currentValue);
    }
  }

  getCardClasses(enrolled: boolean): Record<string, boolean> {
    return {
      'card--enrolled': enrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded,
    };
  }

  get borderStyle(): Record<string, string> {
    const borderColor: Record<Course['gradeStatus'], string> = {
      passed: 'green',
      failed: 'red',
      pending: 'gray',
    };
    return { borderLeftColor: borderColor[this.course.gradeStatus] };
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  toggleEnrollment(enrolled: boolean): void {
    if (enrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    }
    this.enrollRequested.emit(this.course.id);
  }
}
