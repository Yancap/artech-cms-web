import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ArtechException } from '../../utils/errors/ArtechException';
import { TypeError } from '../../models/enums/type-error.enums';
import { ModalMessageService } from '../modal-message/modal-message.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(
    private router: Router,
    private modalMessageService: ModalMessageService
  ) {}

  handleError(error: any): void {
    console.error(error);
    if (error instanceof HttpErrorResponse) {
      this.httpErrorResponseHandler(error);
    } else if (error instanceof ArtechException) {
      this.artechExceptionHandler(error);
    } else {
      this.anyExceptionHandler(error);
    }

    // console.error('An error occurred:', error);
    //throw error (Keep this line uncommented in development  in order to see the error in the console)
  }
  httpErrorResponseHandler(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        this.modalMessageService.modalStack.next({
          message: error.error.message,
          details: error.error.details,
          scope: 'component',
          type: error.error.type,
          status: error.error.status,
        });
        return;
      case 401:
        this.modalMessageService.modalStack.next({
          message: error.error.message,
          details: error.error.details,
          scope: 'top',
          type: error.error.type,
          status: error.error.status,
        });
        this.router.navigateByUrl('/login');
        return;
      default:
        return;
    }
  }

  artechExceptionHandler(error: ArtechException) {
    this.modalMessageService.modalStack.next({
      message: error.message,
      details: error.details,
      scope: error.scope,
      type: error.type,
      status: error.status,
    });
  }

  anyExceptionHandler(error: Error) {

    this.modalMessageService.modalStack.next({
      message: error.name,
      details: error.message,
      scope: 'top',
      type: TypeError.ERROR,
      status: 400,
    });
  }
}
