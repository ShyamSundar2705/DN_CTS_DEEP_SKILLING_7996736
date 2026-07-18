import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course/course';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard, Highlight],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {

  isLoading = true;

  courses: Course[] = [];

  selectedCourseId: number | null = null;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  // trackBy keeps the list keyed by course id, so *ngFor patches only cards whose data changed
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
