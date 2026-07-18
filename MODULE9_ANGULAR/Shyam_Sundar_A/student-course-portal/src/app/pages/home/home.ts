import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CourseService } from '../../services/course/course';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { Notification } from '../../components/notification/notification';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CourseSummaryWidget, Notification],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';

  constructor(private courseService: CourseService) { }

  get courseCount(): number {
    return this.courseService.getCourses().length;
  }

  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}
