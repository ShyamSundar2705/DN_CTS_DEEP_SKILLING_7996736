import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { CanComponentDeactivate, unsavedChangesGuard } from './unsaved-changes-guard';

describe('unsavedChangesGuard', () => {
  const executeGuard: CanDeactivateFn<CanComponentDeactivate> = (...guardParameters) =>
      TestBed.runInInjectionContext(() => unsavedChangesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  function componentWith(hasUnsavedChanges: boolean): CanComponentDeactivate {
    return { hasUnsavedChanges: () => hasUnsavedChanges };
  }

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation without prompting when the form is clean', () => {
    spyOn(window, 'confirm');

    const result = executeGuard(componentWith(false), {} as never, {} as never, {} as never);

    expect(result).toBeTrue();
    expect(window.confirm).not.toHaveBeenCalled();
  });

  it('should prompt with window.confirm when the form is dirty', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    executeGuard(componentWith(true), {} as never, {} as never, {} as never);

    expect(window.confirm).toHaveBeenCalledWith('You have unsaved changes. Leave?');
  });

  it('should allow navigation when the user confirms leaving', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const result = executeGuard(componentWith(true), {} as never, {} as never, {} as never);

    expect(result).toBeTrue();
  });

  it('should block navigation when the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    const result = executeGuard(componentWith(true), {} as never, {} as never, {} as never);

    expect(result).toBeFalse();
  });
});
