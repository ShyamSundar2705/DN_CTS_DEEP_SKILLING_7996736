import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';

import { errorInterceptor } from './error-interceptor';

describe('errorInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  function run(next: HttpHandlerFn) {
    return TestBed.runInInjectionContext(() =>
      errorInterceptor(new HttpRequest('GET', '/courses'), next)
    );
  }

  it('should be created', () => {
    expect(errorInterceptor).toBeTruthy();
  });

  it('should log and rethrow a 401 Unauthorized error', (done) => {
    const consoleSpy = spyOn(console, 'error');
    const httpError = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
    const next: HttpHandlerFn = () => throwError(() => httpError);

    run(next).subscribe({
      error: (err) => {
        expect(err).toBe(httpError);
        expect(consoleSpy).toHaveBeenCalledWith('Unauthorized request:', '/courses');
        done();
      },
    });
  });

  it('should log and rethrow a 500 Server Error', (done) => {
    const consoleSpy = spyOn(console, 'error');
    const httpError = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });
    const next: HttpHandlerFn = () => throwError(() => httpError);

    run(next).subscribe({
      error: (err) => {
        expect(err).toBe(httpError);
        expect(consoleSpy).toHaveBeenCalledWith('Server error while calling:', '/courses');
        done();
      },
    });
  });

  it('should rethrow other errors without special-casing them', (done) => {
    const consoleSpy = spyOn(console, 'error');
    const httpError = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
    const next: HttpHandlerFn = () => throwError(() => httpError);

    run(next).subscribe({
      error: (err) => {
        expect(err).toBe(httpError);
        expect(consoleSpy).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
