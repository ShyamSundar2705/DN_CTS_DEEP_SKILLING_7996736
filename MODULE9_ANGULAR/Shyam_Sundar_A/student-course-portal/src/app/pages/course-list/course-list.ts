import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCard } from '../../components/course-card/course-card';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner';
import { Highlight } from '../../directives/highlight';
import { Course } from '../../models/course.model';
import { CourseApiService } from '../../services/course-api.service';
import { NotificationService } from '../../services/notification/notification';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard, Highlight, LoadingSpinner],
  providers: [NotificationService],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {

  isLoading = true;
  hasError = false;

  courses: Course[] = [];

  selectedCourseId: number | null = null;

  constructor(
    private courseApiService: CourseApiService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.hasError = false;

    this.courseApiService.getCourses().subscribe({
      next: courses => {
        this.courses = courses;
        this.isLoading = false;
        this.notificationService.notify('Course Loaded');
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
        this.notificationService.notify('Error Loading Course');
      }
    });
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
