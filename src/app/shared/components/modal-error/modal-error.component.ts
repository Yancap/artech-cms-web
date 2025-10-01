import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { TypeError } from '../../models/enums/type-error.enums';
import { SvgComponent } from "../svg/svg.component";

@Component({
  selector: 'app-modal-error',
  standalone: true,
  imports: [SvgComponent],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.scss',
})
export class ModalErrorComponent {
  message: string = 'Permissão negada.';
  details: string = 'Você não tem acesso para realizar essa ação.';
  scope: 'top' | 'component' = 'top';
  type: TypeError = TypeError.INFO;
  status = 500;
  private componentRef!: ComponentRef<ModalErrorComponent>;
  constructor(private viewContainerRef: ViewContainerRef) {}


  closeModal() {

    this.componentRef = this.viewContainerRef.createComponent(ModalErrorComponent);
    this.componentRef.destroy();
  }

}
