import {
  ComponentRef,
  inject,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { ModalErrorComponent } from '../../components/modal-error/modal-error.component';
import { TypeError } from '../../models/enums/type-error.enums';
import { Subject } from 'rxjs';
import { IModalMessageData } from '../../models/interfaces/IModalMessageData';

@Injectable({
  providedIn: 'root',
})
export class ModalMessageService {
  isOpen = false;
  modalData?: IModalMessageData;
  modalStack: Subject<IModalMessageData> = new Subject();

  openModal(modalData: IModalMessageData) {}
  closeModal() {}
}
