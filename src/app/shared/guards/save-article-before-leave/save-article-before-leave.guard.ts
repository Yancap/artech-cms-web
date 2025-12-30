import { CanDeactivateFn } from '@angular/router';

export const saveArticleBeforeLeaveGuard: CanDeactivateFn<ISaveArticleBeforeLeave> = (component, currentRoute, currentState, nextState) => {
  return component.generateDialogBeforeLeaveOfRoute();
};
