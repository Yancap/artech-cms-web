import { HttpClient } from '@angular/common/http';
import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { concatMap, ReplaySubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public userAccess: ReplaySubject<IUserData> = new ReplaySubject(1);

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public login(loginDTO: { email: string; password: string }) {
    return this.http
      .post<{ token: string }>(
        environment.apiUrl + `/auth/login/authentication`,
        {
          email: loginDTO.email,
          password: loginDTO.password,
        }
      )
      .pipe(
        tap((data) => this.tokenService.setUserToken(data.token)),
        concatMap(() => this.getAccess()),
      );
  }

  public getAccess() {
    const token = this.tokenService.getUserToken();
    return this.http
      .get<IUserData>(environment.apiUrl + `/auth/login/access`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .pipe(tap((data) => this.userAccess.next(data)));
  }
}
