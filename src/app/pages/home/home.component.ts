import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { SvgComponent } from '../../shared/components/svg/svg.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ModalErrorComponent } from '../../shared/components/modal-error/modal-error.component';
import { ModalMessageService } from '../../shared/services/modal-message/modal-message.service';
import { TypeError } from '../../shared/models/enums/type-error.enums';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    ProfileComponent,
    SvgComponent,
    RouterLink,
    RouterLinkActive,
    ModalErrorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userData!: IUserData;
  @ViewChild('containerModals', { read: ViewContainerRef, static: true })
  containerModalsRef!: ViewContainerRef;

  constructor(
    private authService: AuthService,
    private modalMessageService: ModalMessageService
  ) {}
  ngOnInit(): void {
    this.authService.userAccess.subscribe((userData) => {
      this.userData = userData;
    });

    this.modalMessageService.modalStack.subscribe((modalData) => {

      const componentRef =
        this.containerModalsRef.createComponent(ModalErrorComponent);
      componentRef.instance.details = modalData.details;
      componentRef.instance.message = modalData.message;
      componentRef.instance.scope = modalData.scope;
      componentRef.instance.status = modalData.status;
      componentRef.instance.type = modalData.type;
      componentRef.instance.closeModal = () => {
        componentRef.destroy();
      };


    });

    
  }
}
