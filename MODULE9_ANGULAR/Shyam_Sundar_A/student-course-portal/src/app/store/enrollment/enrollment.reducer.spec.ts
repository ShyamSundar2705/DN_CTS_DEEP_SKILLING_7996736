import { enrollInCourse, setEnrolledCourses, unenrollFromCourse } from './enrollment.actions';
import { EnrollmentState, enrollmentReducer, initialEnrollmentState } from './enrollment.reducer';

describe('enrollmentReducer', () => {
  it('should return the initial state for an unknown action', () => {
    const state = enrollmentReducer(undefined, { type: 'UNKNOWN' });

    expect(state).toEqual(initialEnrollmentState);
  });

  it('should add the course id on enrollInCourse', () => {
    const state = enrollmentReducer(initialEnrollmentState, enrollInCourse({ courseId: 1 }));

    expect(state.enrolledCourseIds).toEqual([1]);
  });

  it('should not duplicate an id already enrolled', () => {
    const seedState: EnrollmentState = { enrolledCourseIds: [1] };

    const state = enrollmentReducer(seedState, enrollInCourse({ courseId: 1 }));

    expect(state.enrolledCourseIds).toEqual([1]);
  });

  it('should remove the course id on unenrollFromCourse', () => {
    const seedState: EnrollmentState = { enrolledCourseIds: [1, 2, 3] };

    const state = enrollmentReducer(seedState, unenrollFromCourse({ courseId: 2 }));

    expect(state.enrolledCourseIds).toEqual([1, 3]);
  });

  it('should do nothing when unenrolling an id that is not present', () => {
    const seedState: EnrollmentState = { enrolledCourseIds: [1] };

    const state = enrollmentReducer(seedState, unenrollFromCourse({ courseId: 99 }));

    expect(state.enrolledCourseIds).toEqual([1]);
  });

  it('should replace the enrolled ids on setEnrolledCourses', () => {
    const seedState: EnrollmentState = { enrolledCourseIds: [1] };

    const state = enrollmentReducer(seedState, setEnrolledCourses({ courseIds: [4, 5] }));

    expect(state.enrolledCourseIds).toEqual([4, 5]);
  });
});
