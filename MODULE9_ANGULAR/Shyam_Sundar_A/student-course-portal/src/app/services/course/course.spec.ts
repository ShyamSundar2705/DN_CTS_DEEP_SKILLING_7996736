import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Course } from '../../models/course.model';
import { CourseService } from './course';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:3000/courses';

  const sampleCourse: Course = { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' };
  const sampleCourses: Course[] = [
    sampleCourse,
    { id: 2, name: 'Java', code: 'JAVA201', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCourses', () => {
    it('should issue a GET to the courses endpoint and map the response', () => {
      let result: Course[] | undefined;

      service.getCourses().subscribe(courses => (result = courses));

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(sampleCourses);

      expect(result).toEqual(sampleCourses);
    });

    it('should update the shared courses$ cache after a successful load', () => {
      service.getCourses().subscribe();

      const req = httpMock.expectOne(apiUrl);
      req.flush(sampleCourses);

      let cached: Course[] | undefined;
      service.courses$.subscribe(courses => (cached = courses));
      expect(cached).toEqual(sampleCourses);
    });
  });

  describe('searchCourses', () => {
    it('should issue a GET with a name_like query param when a term is provided', () => {
      service.searchCourses('ang').subscribe();

      const req = httpMock.expectOne(request => request.url === apiUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('name_like')).toBe('ang');
      req.flush([sampleCourse]);
    });

    it('should issue a plain GET with no params when the term is empty', () => {
      service.searchCourses('').subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.params.keys().length).toBe(0);
      req.flush(sampleCourses);
    });
  });

  describe('getCourseById', () => {
    it('should issue a GET to the course-specific URL', () => {
      let result: Course | undefined;

      service.getCourseById(1).subscribe(course => (result = course));

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(sampleCourse);

      expect(result).toEqual(sampleCourse);
    });
  });

  describe('addCourse', () => {
    it('should POST the new course body and return the created course', () => {
      const newCourse = { name: 'DevOps', code: 'DEV501', credits: 4, gradeStatus: 'pending' as const };
      let result: Course | undefined;

      service.addCourse(newCourse).subscribe(course => (result = course));

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newCourse);

      const created: Course = { id: 5, ...newCourse };
      req.flush(created);

      expect(result).toEqual(created);
    });
  });

  describe('updateCourse', () => {
    it('should PUT to the course-specific URL with the full course body', () => {
      const updated: Course = { ...sampleCourse, credits: 5 };
      let result: Course | undefined;

      service.updateCourse(updated).subscribe(course => (result = course));

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updated);
      req.flush(updated);

      expect(result).toEqual(updated);
    });
  });

  describe('deleteCourse', () => {
    it('should DELETE the course-specific URL', () => {
      let completed = false;

      service.deleteCourse(1).subscribe(() => (completed = true));

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);

      expect(completed).toBeTrue();
    });
  });

  describe('error handling', () => {
    it('should map a failed getCourses request to a friendly error', () => {
      let error: Error | undefined;

      service.getCourses().subscribe({
        error: (err) => (error = err),
      });

      // retry(2) means the request is retried twice before the error propagates.
      for (let attempt = 0; attempt < 3; attempt++) {
        httpMock.expectOne(apiUrl).flush('server error', { status: 500, statusText: 'Server Error' });
      }

      expect(error?.message).toBe('Something went wrong while contacting the course service.');
    });
  });
});
