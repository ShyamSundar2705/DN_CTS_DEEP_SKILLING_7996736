import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course/course';
import { loadCourses, loadCoursesFailure, loadCoursesSuccess } from './course.actions';
import { CourseEffects } from './course.effects';

describe('CourseEffects', () => {
  let effects: CourseEffects;
  let actions$: Observable<unknown>;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;

  const sampleCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
  ];

  beforeEach(() => {
    courseServiceSpy = jasmine.createSpyObj<CourseService>('CourseService', ['getCourses', 'searchCourses']);

    TestBed.configureTestingModule({
      providers: [
        CourseEffects,
        provideMockActions(() => actions$),
        { provide: CourseService, useValue: courseServiceSpy },
      ],
    });

    effects = TestBed.inject(CourseEffects);
  });

  it('should dispatch loadCoursesSuccess when the HTTP call succeeds', (done) => {
    courseServiceSpy.getCourses.and.returnValue(of(sampleCourses));
    actions$ = of(loadCourses({}));

    effects.loadCourses$.subscribe(action => {
      expect(action).toEqual(loadCoursesSuccess({ courses: sampleCourses }));
      expect(courseServiceSpy.getCourses).toHaveBeenCalled();
      expect(courseServiceSpy.searchCourses).not.toHaveBeenCalled();
      done();
    });
  });

  it('should call searchCourses when a searchTerm is provided', (done) => {
    courseServiceSpy.searchCourses.and.returnValue(of(sampleCourses));
    actions$ = of(loadCourses({ searchTerm: 'ang' }));

    effects.loadCourses$.subscribe(action => {
      expect(courseServiceSpy.searchCourses).toHaveBeenCalledWith('ang');
      expect(action).toEqual(loadCoursesSuccess({ courses: sampleCourses }));
      done();
    });
  });

  it('should dispatch loadCoursesFailure when the HTTP call fails', (done) => {
    courseServiceSpy.getCourses.and.returnValue(throwError(() => new Error('Network down')));
    actions$ = of(loadCourses({}));

    effects.loadCourses$.subscribe(action => {
      expect(action).toEqual(loadCoursesFailure({ error: 'Network down' }));
      done();
    });
  });
});
