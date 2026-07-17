import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { noCourseCode } from '../../validators/no-course-code.validator';
import { simulateEmailCheck } from '../../validators/simulate-email-check.validator';

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {

  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    // value omits disabled controls; getRawValue() includes every control regardless of disabled state
    console.log(this.enrollForm.value);
    console.log(this.enrollForm.getRawValue());
    this.submitted = true;
  }

  onReset(): void {
    this.enrollForm.reset({
      studentName: '',
      studentEmail: '',
      courseId: '',
      preferredSemester: 'Odd',
      agreeToTerms: false,
    });
    this.additionalCourses.clear();
    this.submitted = false;
  }
}
