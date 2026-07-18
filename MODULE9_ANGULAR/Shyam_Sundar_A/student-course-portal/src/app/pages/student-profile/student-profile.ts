import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { EnrollmentService } from '../../services/enrollment/enrollment';

@Component({
  selector: 'app-student-profile',
  imports: [NgFor, NgIf, CreditLabelPipe],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {

  constructor(private enrollmentService: EnrollmentService) { }

  get enrolledCourses(): Course[] {
    return this.enrollmentService.getEnrolledCourses();
  }
}
