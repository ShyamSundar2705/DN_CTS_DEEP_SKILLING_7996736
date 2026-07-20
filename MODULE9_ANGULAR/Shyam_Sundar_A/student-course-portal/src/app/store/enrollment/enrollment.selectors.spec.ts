import { Course } from '../../models/course.model';
import { EnrollmentState } from './enrollment.reducer';
import { selectEnrolledCourseIds, selectEnrolledCourses, selectEnrollmentState } from './enrollment.selectors';

describe('Enrollment selectors', () => {
  const sampleCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Java', code: 'JAVA201', credits: 3, gradeStatus: 'pending' },
    { id: 3, name: 'Spring Boot', code: 'SPR301', credits: 4, gradeStatus: 'failed' },
  ];

  const enrollmentState: EnrollmentState = { enrolledCourseIds: [1, 3] };

  // Testing selectors via their raw `.projector` (fed the parent selectors' already
  // -resolved outputs) rather than invoking the memoized selector against a full,
  // hand-built app state avoids relying on the module-level memoization cache these
  // selectors share with every other spec file in the run.

  it('selectEnrollmentState should return the enrollment feature slice unchanged', () => {
    expect(selectEnrollmentState.projector(enrollmentState)).toEqual(enrollmentState);
  });

  it('selectEnrolledCourseIds should return the enrolled ids', () => {
    expect(selectEnrolledCourseIds.projector(enrollmentState)).toEqual([1, 3]);
  });

  it('selectEnrolledCourses should combine both slices into full Course objects', () => {
    const result = selectEnrolledCourses.projector(sampleCourses, [1, 3]);

    expect(result).toEqual([sampleCourses[0], sampleCourses[2]]);
  });

  it('selectEnrolledCourses should return an empty array when nothing is enrolled', () => {
    expect(selectEnrolledCourses.projector(sampleCourses, [])).toEqual([]);
  });

  it('selectEnrolledCourses should ignore enrolled ids that no longer exist in the course list', () => {
    expect(selectEnrolledCourses.projector(sampleCourses, [1, 999])).toEqual([sampleCourses[0]]);
  });
});
