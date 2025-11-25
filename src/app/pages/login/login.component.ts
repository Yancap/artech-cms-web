import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { concatMap, first, of } from 'rxjs';
import { TokenService } from '../../shared/services/token/token.service';
import { Router } from '@angular/router';
import { ModalMessageService } from '../../shared/services/modal-message/modal-message.service';
import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private _email = '';
  private _password = '';
  @ViewChild('containerModals', { read: ViewContainerRef, static: true })
  containerModalsRef!: ViewContainerRef;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,

    private modalMessageService: ModalMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tokenService.resetUserToken();
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

  public email(value: any) {
    console.log(value);
    
    this._email = value;
  }

  public password(value: any) {
    console.log(value);
    this._password = value;
  }

  public login(event: Event) {
    event.preventDefault();
    console.log(this._email);
    console.log(this._password);
    
    this.authService
      .login({
        email: this._email,
        password: this._password,
      })
      .pipe(
        first(),
        concatMap(() => {
          const token = this.tokenService.getUserToken();
          if (token) return this.router.navigateByUrl('/articles/active');
          return of();
        })
      )
      .subscribe();
  }
}
