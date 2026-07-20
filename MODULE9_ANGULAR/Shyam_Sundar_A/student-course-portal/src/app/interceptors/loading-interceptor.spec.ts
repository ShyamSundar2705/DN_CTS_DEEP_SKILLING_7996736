import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Loading } from '../services/loading/loading';
import { loadingInterceptor } from './loading-interceptor';

describe('loadingInterceptor', () => {
  let loadingService: Loading;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loadingService = TestBed.inject(Loading);
  });

  it('should be created', () => {
    expect(loadingInterceptor).toBeTruthy();
  });

  it('should set loading to true as soon as the request starts and false once it completes', () => {
    const states: boolean[] = [];
    loadingService.loading$.subscribe(state => states.push(state));

    const responseSubject = new Subject<HttpEvent<unknown>>();
    const next: HttpHandlerFn = () => responseSubject.asObservable();

    const result = TestBed.runInInjectionContext(() =>
      loadingInterceptor(new HttpRequest('GET', '/courses'), next)
    );

    expect(states[states.length - 1]).toBeTrue();

    const sub = result.subscribe();
    responseSubject.next({} as HttpEvent<unknown>);
    responseSubject.complete();

    expect(states[states.length - 1]).toBeFalse();
    sub.unsubscribe();
  });

  it('should only hide the spinner once every in-flight request has finished', () => {
    const first = new Subject<HttpEvent<unknown>>();
    const second = new Subject<HttpEvent<unknown>>();

    const firstResult = TestBed.runInInjectionContext(() =>
      loadingInterceptor(new HttpRequest('GET', '/courses'), () => first.asObservable())
    );
    const secondResult = TestBed.runInInjectionContext(() =>
      loadingInterceptor(new HttpRequest('GET', '/courses/1'), () => second.asObservable())
    );

    let finalState: boolean | undefined;
    loadingService.loading$.subscribe(state => (finalState = state));

    firstResult.subscribe();
    secondResult.subscribe();

    first.complete();
    // Second request is still in flight, so the spinner must stay visible.
    expect(finalState).toBeTrue();

    second.complete();
    expect(finalState).toBeFalse();
  });
});
