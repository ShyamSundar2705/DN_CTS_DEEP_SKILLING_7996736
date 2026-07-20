import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';
import { CourseList } from './course-list';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;
  let router: Router;

  const sampleCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Java', code: 'JAVA201', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
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
            { selector: selectAllCourses, value: [] },
            { selector: selectCoursesError, value: null },
            { selector: selectCoursesLoading, value: false },
          ]
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(convertToParamMap({})),
            snapshot: { queryParamMap: convertToParamMap({}) }
          }
        }
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCourses on initialization', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(loadCourses({ searchTerm: undefined }));
  });

  it('should render a card for every course in the store', () => {
    store.overrideSelector(selectAllCourses, sampleCourses);
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('app-course-card');
    expect(cards.length).toBe(2);
  });

  it('should show the loading message while selectCoursesLoading is true', () => {
    store.overrideSelector(selectCoursesLoading, true);
    fixture.detectChanges();

    const loadingEl = fixture.nativeElement.querySelector('.loading-message');
    expect(loadingEl?.textContent).toContain('Loading courses...');
  });

  it('should show the error message when selectCoursesError has a value', () => {
    store.overrideSelector(selectCoursesError, 'Something went wrong while contacting the course service.');
    fixture.detectChanges();

    const errorEl = fixture.nativeElement.querySelector('.error-message');
    expect(errorEl?.textContent).toContain('Something went wrong');
  });

  it('should render the empty state when there are no courses and no error', () => {
    store.overrideSelector(selectAllCourses, []);
    store.overrideSelector(selectCoursesError, null);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No courses available.');
  });

  it('should dispatch loadCourses with the search term when searching', () => {
    fixture.detectChanges();
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onSearch('angular');

    expect(dispatchSpy).toHaveBeenCalledWith(loadCourses({ searchTerm: 'angular' }));
    expect(router.navigate).toHaveBeenCalledWith([], jasmine.objectContaining({
      queryParams: { q: 'angular' },
      queryParamsHandling: 'merge',
    }));
  });

  it('should dispatch loadCourses with an undefined search term when the search box is cleared', () => {
    fixture.detectChanges();
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onSearch('');

    expect(dispatchSpy).toHaveBeenCalledWith(loadCourses({ searchTerm: undefined }));
  });
});
