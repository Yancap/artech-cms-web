import { TypeModal } from '../enums/type-modal.enums';

declare interface IModalMessageData {
  message: string;
  details: string;
  scope: 'top' | 'component';
  type: TypeModal | string;
  status: number;
  closeAction?: () => void;
}
