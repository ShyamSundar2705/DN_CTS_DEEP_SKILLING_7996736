import { Course } from '../../models/course.model';
import { loadCourses, loadCoursesFailure, loadCoursesSuccess } from './course.actions';
import { CourseState, courseReducer, initialCourseState } from './course.reducer';

describe('courseReducer', () => {
  const sampleCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Java', code: 'JAVA201', credits: 3, gradeStatus: 'pending' },
  ];

  it('should return the initial state for an unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const state = courseReducer(undefined, action);

    expect(state).toEqual(initialCourseState);
  });

  it('should set loading true and clear the error on loadCourses', () => {
    const seedState: CourseState = { courses: [], loading: false, error: 'previous error' };

    const state = courseReducer(seedState, loadCourses({}));

    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should store the courses and clear loading/error on loadCoursesSuccess', () => {
    const seedState: CourseState = { courses: [], loading: true, error: null };

    const state = courseReducer(seedState, loadCoursesSuccess({ courses: sampleCourses }));

    expect(state.courses).toEqual(sampleCourses);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should set the error and clear loading on loadCoursesFailure', () => {
    const seedState: CourseState = { courses: sampleCourses, loading: true, error: null };

    const state = courseReducer(seedState, loadCoursesFailure({ error: 'Network error' }));

    expect(state.loading).toBeFalse();
    expect(state.error).toBe('Network error');
    // Existing courses are preserved on failure — only loading/error change.
    expect(state.courses).toEqual(sampleCourses);
  });
});
