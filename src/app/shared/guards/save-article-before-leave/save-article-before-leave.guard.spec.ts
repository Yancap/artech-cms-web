import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { saveArticleBeforeLeaveGuard } from './save-article-before-leave.guard';

describe('saveArticleBeforeLeaveGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => saveArticleBeforeLeaveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
