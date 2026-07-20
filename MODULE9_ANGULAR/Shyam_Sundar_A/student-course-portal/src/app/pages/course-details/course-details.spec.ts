import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { CourseDetails } from './course-details';

describe('CourseDetails', () => {
  let component: CourseDetails;
  let fixture: ComponentFixture<CourseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetails],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '1' })) }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
