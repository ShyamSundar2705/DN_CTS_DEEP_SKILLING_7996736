import { TestBed } from '@angular/core/testing';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

import { authInterceptor } from './auth-interceptor';

describe('authInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(authInterceptor).toBeTruthy();
  });

  it('should attach the Authorization header to outgoing requests', () => {
    const originalReq = new HttpRequest('GET', '/courses');
    let capturedReq!: HttpRequest<unknown>;

    const next: HttpHandlerFn = (req) => {
      capturedReq = req;
      return of();
    };

    TestBed.runInInjectionContext(() => authInterceptor(originalReq, next)).subscribe();

    expect(capturedReq.headers.get('Authorization')).toBe('Bearer mock-token-12345');
  });

  it('should not mutate the original request object', () => {
    const originalReq = new HttpRequest('GET', '/courses');
    const next: HttpHandlerFn = (req) => of();

    TestBed.runInInjectionContext(() => authInterceptor(originalReq, next)).subscribe();

    expect(originalReq.headers.has('Authorization')).toBeFalse();
  });
});
