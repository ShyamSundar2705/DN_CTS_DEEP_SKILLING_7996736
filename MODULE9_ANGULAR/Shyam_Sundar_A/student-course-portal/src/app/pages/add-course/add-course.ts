import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Course } from '../../models/course.model';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner';
import { CourseApiService } from '../../services/course-api.service';
import { NotificationService } from '../../services/notification/notification';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule, NgIf, LoadingSpinner],
  providers: [NotificationService],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css',
})
export class AddCourse {

  courseForm: FormGroup;
  isSubmitting = false;
  submitted = false;
  submitError = false;

  constructor(
    private fb: FormBuilder,
    private courseApiService: CourseApiService,
    private notificationService: NotificationService
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', Validators.required],
      credits: [1, [Validators.required, Validators.min(1), Validators.max(6)]],
    });
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.submitted = false;
    this.submitError = false;

    const newCourse: Course = {
      id: Date.now(),
      name: this.courseForm.value.name,
      code: this.courseForm.value.code,
      credits: this.courseForm.value.credits,
      gradeStatus: 'pending',
    };

    this.courseApiService.createCourse(newCourse).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitted = true;
        this.notificationService.notify('Course Created');
        this.courseForm.reset({ name: '', code: '', credits: 1 });
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = true;
      }
    });
  }
}
