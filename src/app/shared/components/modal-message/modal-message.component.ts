import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { TypeModal } from '../../models/enums/type-modal.enums';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-modal-message',
  standalone: true,
  imports: [SvgComponent],
  templateUrl: './modal-message.component.html',
  styleUrl: './modal-message.component.scss',
})
export class ModalMessageComponent {
  message: string = 'Permissão negada.';
  details: string = 'Você não tem acesso para realizar essa ação.';
  scope: 'top' | 'component' = 'top';
  type: TypeModal | string = TypeModal.INFO;
  status = 500;
  closeAction: (() => void ) | undefined  = () => {};
  componentRef!: ComponentRef<ModalMessageComponent>;

  closeModal() {
    if(this.closeAction) this.closeAction();
    this.componentRef?.destroy();
  }
}
