import { AuthService } from './../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { concatMap, first, of } from 'rxjs';
import { TokenService } from '../../shared/services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _email = '';
  private _password = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  public email(value: any) {
    this._email = value;
  }

  public password(value: any) {
    this._password = value;
  }

  public login(event: Event) {
    event.preventDefault();

    this.authService
      .login({
        email: this._email,
        password: this._password,
      })
      .pipe(
        first(),
        concatMap(() => {
          const token = this.tokenService.getUserToken();
          if (token) return this.router.navigateByUrl('/article/active');
          return of();
        })
      )
      .subscribe();
  }
}
