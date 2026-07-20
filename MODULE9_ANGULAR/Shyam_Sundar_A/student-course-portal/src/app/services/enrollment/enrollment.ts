import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../../models/course.model';
import { CourseService } from '../course/course';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {

  private enrolledCourseIds: number[] = [];

  constructor(private courseService: CourseService) { }

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.courseService.getCourses().pipe(
      map(courses => courses.filter(course => this.enrolledCourseIds.includes(course.id)))
    );
  }
}
