import { Course } from '../../models/course.model';
import { CourseState } from './course.reducer';
import { selectAllCourses, selectCourseState, selectCoursesError, selectCoursesLoading } from './course.selectors';

describe('Course selectors', () => {
  const sampleCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Java', code: 'JAVA201', credits: 3, gradeStatus: 'pending' },
  ];

  const courseState: CourseState = {
    courses: sampleCourses,
    loading: true,
    error: 'Something went wrong',
  };

  // Testing selectors via their raw `.projector` (fed the parent selector's already
  // -resolved output) rather than invoking the memoized selector against a full,
  // hand-built app state avoids relying on the module-level memoization cache these
  // selectors share with every other spec file in the run.

  it('selectCourseState should return the course feature slice unchanged', () => {
    expect(selectCourseState.projector(courseState)).toEqual(courseState);
  });

  it('selectAllCourses should return the courses array', () => {
    expect(selectAllCourses.projector(courseState)).toEqual(sampleCourses);
  });

  it('selectCoursesLoading should return the loading flag', () => {
    expect(selectCoursesLoading.projector(courseState)).toBeTrue();
  });

  it('selectCoursesError should return the error message', () => {
    expect(selectCoursesError.projector(courseState)).toBe('Something went wrong');
  });

  it('selectCoursesError should return null when there is no error', () => {
    const cleanState: CourseState = { courses: [], loading: false, error: null };

    expect(selectCoursesError.projector(cleanState)).toBeNull();
  });
});
