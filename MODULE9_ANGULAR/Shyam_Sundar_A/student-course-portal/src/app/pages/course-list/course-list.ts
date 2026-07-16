import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard, Highlight],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {

  isLoading = true;

  courses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed', enrolled: false },
    { id: 2, name: 'Java', code: 'JAVA201', credits: 3, gradeStatus: 'pending', enrolled: false },
    { id: 3, name: 'Spring Boot', code: 'SPR301', credits: 4, gradeStatus: 'failed', enrolled: false },
    { id: 4, name: 'React', code: 'REA401', credits: 3, gradeStatus: 'passed', enrolled: false },
    { id: 5, name: 'DevOps', code: 'DEV501', credits: 4, gradeStatus: 'pending', enrolled: false },
  ];

  selectedCourseId: number | null = null;

  ngOnInit(): void {
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

    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      course.enrolled = true;
    }
  }
}
