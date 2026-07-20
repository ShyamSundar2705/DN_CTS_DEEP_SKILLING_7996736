import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses } from '../../store/course/course.selectors';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let store: MockStore;

  const sampleCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Java', code: 'JAVA201', credits: 3, gradeStatus: 'pending' },
    { id: 3, name: 'Spring Boot', code: 'SPR301', credits: 4, gradeStatus: 'failed' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({
          initialState: {
            course: { courses: [], loading: false, error: null },
            enrollment: { enrolledCourseIds: [] }
          },
          selectors: [
            { selector: selectAllCourses, value: sampleCourses },
            { selector: selectEnrolledCourses, value: [sampleCourses[0]] },
          ]
        })
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the portal title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Student Course Portal');
  });

  it('should dispatch loadCourses on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(loadCourses({}));
  });

  it('should display the course count from the selectAllCourses selector', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const statCards = compiled.querySelectorAll('.stat-card h2');

    expect(statCards[0].textContent?.trim()).toBe('3');
  });

  it('should display the enrolled count from the selectEnrolledCourses selector', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const statCards = compiled.querySelectorAll('.stat-card h2');

    expect(statCards[1].textContent?.trim()).toBe('1');
  });

  it('should update the displayed course count when the selector emits a new value', () => {
    fixture.detectChanges();
    store.overrideSelector(selectAllCourses, [...sampleCourses, {
      id: 4, name: 'React', code: 'REA401', credits: 3, gradeStatus: 'passed'
    }]);
    store.refreshState();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const statCards = compiled.querySelectorAll('.stat-card h2');
    expect(statCards[0].textContent?.trim()).toBe('4');
  });
});
