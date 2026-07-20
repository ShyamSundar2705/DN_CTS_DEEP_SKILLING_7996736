import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start logged out', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('login() should mark the user as logged in', () => {
    service.login();

    expect(service.isLoggedIn()).toBeTrue();
  });

  it('logout() should mark the user as logged out', () => {
    service.login();
    service.logout();

    expect(service.isLoggedIn()).toBeFalse();
  });
});
