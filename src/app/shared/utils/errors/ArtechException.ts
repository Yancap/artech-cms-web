import { TypeError } from '../../models/enums/type-error.enums';

export class ArtechException implements Error {
  message: string = '';
  details: string = '';
  scope: 'top' | 'component' = 'top'; //top ou component
  type = TypeError.ERROR;
  status = 500;

  name: string = 'ArtechException';
  stack?: string | undefined;
  cause?: unknown;

  constructor(errorObj: {
    message: string;
    details: string;
    type: TypeError;
    status: number;
    scope: 'top' | 'component';
  }) {
    this.message = errorObj.message;
    this.details = errorObj.details;
    this.cause = `${errorObj.type}: ${errorObj.message} ${errorObj.details}`;
    this.type = errorObj.type;
    this.status = errorObj.status;
    this.scope = errorObj.scope;
  }
}
