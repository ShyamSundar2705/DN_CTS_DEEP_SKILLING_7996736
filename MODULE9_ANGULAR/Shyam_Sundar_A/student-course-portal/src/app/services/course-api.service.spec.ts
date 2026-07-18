import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CourseApiService } from './course-api.service';

describe('CourseApiService', () => {
  let service: CourseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CourseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
