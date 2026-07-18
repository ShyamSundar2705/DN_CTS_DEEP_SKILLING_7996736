import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner';
import { CourseApiService } from '../../services/course-api.service';
import { NotificationService } from '../../services/notification/notification';

@Component({
  selector: 'app-course-details',
  imports: [NgIf, RouterLink, CreditLabelPipe, LoadingSpinner],
  providers: [NotificationService],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit {

  course: Course | null = null;
  isLoading = true;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private courseApiService: CourseApiService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.hasError = true;
      this.isLoading = false;
      return;
    }

    this.courseApiService.getCourse(id).subscribe({
      next: course => {
        this.course = course;
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
}
