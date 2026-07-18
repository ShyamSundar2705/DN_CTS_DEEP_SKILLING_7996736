import { Component } from '@angular/core';

import { CourseService } from '../../services/course/course';

@Component({
  selector: 'app-course-summary-widget',
  imports: [],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css',
})
export class CourseSummaryWidget {

  constructor(private courseService: CourseService) { }

  get totalCourses(): number {
    return this.courseService.getCourses().length;
  }

  addSampleCourse(): void {
    const nextId = this.courseService.getCourses().length + 1;
    this.courseService.addCourse({
      id: nextId,
      name: `Sample Course ${nextId}`,
      code: `SMP${nextId}01`,
      credits: 3,
      gradeStatus: 'pending',
    });
  }
}
