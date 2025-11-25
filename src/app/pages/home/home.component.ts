import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { SvgComponent } from '../../shared/components/svg/svg.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message.component';
import { ModalMessageService } from '../../shared/services/modal-message/modal-message.service';
import { TypeModal } from '../../shared/models/enums/type-modal.enums';
import { ChangeUserDataComponent } from '../../shared/components/change-user-data/change-user-data.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    ProfileComponent,
    SvgComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userData!: IUserData;

  @ViewChild('containerModals', { read: ViewContainerRef, static: true })
  containerModalsRef!: ViewContainerRef;

  @ViewChild('changeAvatar', { read: ViewContainerRef, static: true })
  changeAvatarRef!: ViewContainerRef;

  constructor(
    private authService: AuthService,
    private modalMessageService: ModalMessageService
  ) {}

  menuIsOpen = false;

  ngOnInit(): void {
    this.authService.userAccess.subscribe((userData) => {
      this.userData = userData;
    });

    this.modalMessageService.modalStack.subscribe((modalData) => {
      const componentRef = this.containerModalsRef.createComponent(
        ModalMessageComponent
      );
      componentRef.instance.details = modalData.details;
      componentRef.instance.message = modalData.message;
      componentRef.instance.scope = modalData.scope;
      componentRef.instance.status = modalData.status;
      componentRef.instance.type = modalData.type;
      componentRef.instance.closeAction = modalData.closeAction;
      componentRef.instance.componentRef = componentRef;
    });
  }


  public toggleMenu(toggle: boolean) {
    this.menuIsOpen = toggle;
  }
}
