import { TypeError } from '../enums/type-error.enums';

declare interface IModalMessageData {
  message: string;
  details: string;
  scope: 'top' | 'component';
  type: TypeError;
  status: number;
}
