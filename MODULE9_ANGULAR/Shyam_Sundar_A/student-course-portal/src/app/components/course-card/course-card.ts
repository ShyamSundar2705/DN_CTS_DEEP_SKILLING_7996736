import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgClass, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { EnrollmentService } from '../../services/enrollment/enrollment';

@Component({
  selector: 'app-course-card',
  imports: [NgClass, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {

  @Input()
  course!: Course;

  @Output()
  enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  constructor(private enrollmentService: EnrollmentService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Previous course value:', changes['course'].previousValue);
      console.log('Current course value:', changes['course'].currentValue);
    }
  }

  get cardClasses(): Record<string, boolean> {
    return {
      'card--enrolled': this.isEnrolled(),
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

  isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  toggleEnrollment(): void {
    if (this.isEnrolled()) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
    this.enrollRequested.emit(this.course.id);
  }
}
