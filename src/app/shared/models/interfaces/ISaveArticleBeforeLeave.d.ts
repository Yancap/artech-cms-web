declare interface ISaveArticleBeforeLeave {
  generateDialogBeforeLeaveOfRoute: () =>  ReplaySubject<boolean>;
}