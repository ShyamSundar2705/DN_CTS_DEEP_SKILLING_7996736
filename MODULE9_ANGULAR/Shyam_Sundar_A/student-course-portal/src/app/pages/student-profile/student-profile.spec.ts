import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { StudentProfile } from './student-profile';

describe('StudentProfile', () => {
  let component: StudentProfile;
  let fixture: ComponentFixture<StudentProfile>;
  let store: MockStore;

  const enrolledCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 3, name: 'Spring Boot', code: 'SPR301', credits: 4, gradeStatus: 'failed' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfile],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({
          initialState: {
            course: { courses: [], loading: false, error: null },
            enrollment: { enrolledCourseIds: [] }
          },
          selectors: [
            { selector: selectEnrolledCourses, value: [] },
          ]
        })
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(StudentProfile);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render one row per enrolled course from selectEnrolledCourses', () => {
    store.overrideSelector(selectEnrolledCourses, enrolledCourses);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('.enrolled-item');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Angular');
    expect(rows[0].textContent).toContain('ANG101');
    expect(rows[0].textContent).toContain('4 Credits');
    expect(rows[1].textContent).toContain('Spring Boot');
  });

  it('should render the empty state when there are no enrolled courses', () => {
    store.overrideSelector(selectEnrolledCourses, []);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No enrolled courses.');
    expect(fixture.nativeElement.querySelectorAll('.enrolled-item').length).toBe(0);
  });
});
