import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('notify() should log the given message to the console', () => {
    const consoleSpy = spyOn(console, 'log');

    service.notify('Course Loaded');

    expect(consoleSpy).toHaveBeenCalledWith('Course Loaded');
  });

  it('notify() should log each call separately', () => {
    const consoleSpy = spyOn(console, 'log');

    service.notify('Course Created');
    service.notify('Error Loading Course');

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy.calls.argsFor(0)).toEqual(['Course Created']);
    expect(consoleSpy.calls.argsFor(1)).toEqual(['Error Loading Course']);
  });
});
