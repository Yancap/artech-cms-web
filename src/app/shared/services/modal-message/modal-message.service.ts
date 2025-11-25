import { Injectable } from '@angular/core';
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
