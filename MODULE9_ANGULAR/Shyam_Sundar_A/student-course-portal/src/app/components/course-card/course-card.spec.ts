import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Course } from '../../models/course.model';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledCourseIds } from '../../store/enrollment/enrollment.selectors';
import { CourseCard } from './course-card';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;

  const passedCourse: Course = { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({
          initialState: {
            course: { courses: [], loading: false, error: null },
            enrollment: { enrolledCourseIds: [] }
          },
          selectors: [
            { selector: selectEnrolledCourseIds, value: [] },
          ]
        })
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = passedCourse;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the course name, code and credit label', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h3')?.textContent).toContain('Angular');
    expect(compiled.querySelector('.course-code')?.textContent).toContain('ANG101');
    expect(compiled.querySelector('.course-credits')?.textContent).toContain('4 Credits');
  });

  it('should display the "Passed" badge for a passed course', () => {
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge');

    expect(badge?.textContent).toContain('Passed');
    expect(badge?.classList).toContain('badge--passed');
  });

  it('should display the "Failed" badge for a failed course', () => {
    component.course = { ...passedCourse, gradeStatus: 'failed' };
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge');

    expect(badge?.textContent).toContain('Failed');
    expect(badge?.classList).toContain('badge--failed');
  });

  it('should display the "Pending" badge for a pending course', () => {
    component.course = { ...passedCourse, gradeStatus: 'pending' };
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge');

    expect(badge?.textContent).toContain('Pending');
    expect(badge?.classList).toContain('badge--pending');
  });

  it('should show the Enroll button and dispatch enrollInCourse when not enrolled', () => {
    store.overrideSelector(selectEnrolledCourseIds, []);
    fixture.detectChanges();
    const dispatchSpy = spyOn(store, 'dispatch');

    const enrollBtn = fixture.nativeElement.querySelector('.enroll-btn') as HTMLButtonElement;
    expect(enrollBtn.textContent?.trim()).toBe('Enroll');

    enrollBtn.click();

    expect(dispatchSpy).toHaveBeenCalledWith(enrollInCourse({ courseId: 1 }));
  });

  it('should show the Unenroll button and dispatch unenrollFromCourse when already enrolled', () => {
    store.overrideSelector(selectEnrolledCourseIds, [1]);
    fixture.detectChanges();
    const dispatchSpy = spyOn(store, 'dispatch');

    const enrollBtn = fixture.nativeElement.querySelector('.enroll-btn') as HTMLButtonElement;
    expect(enrollBtn.textContent?.trim()).toBe('Unenroll');

    enrollBtn.click();

    expect(dispatchSpy).toHaveBeenCalledWith(unenrollFromCourse({ courseId: 1 }));
  });

  it('should emit enrollRequested with the course id when the enroll button is clicked', () => {
    fixture.detectChanges();
    const emitSpy = spyOn(component.enrollRequested, 'emit');

    fixture.nativeElement.querySelector('.enroll-btn').click();

    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  it('should not show the expanded details until Show Details is clicked', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.course-details')).toBeFalsy();
  });

  it('should toggle the expanded details when Show Details is clicked', () => {
    fixture.detectChanges();
    const detailsBtn = fixture.nativeElement.querySelector('.details-btn') as HTMLButtonElement;

    detailsBtn.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.course-details')).toBeTruthy();

    detailsBtn.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.course-details')).toBeFalsy();
  });
});
