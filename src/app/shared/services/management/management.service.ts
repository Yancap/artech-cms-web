import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { environment } from '../../../../environment/environment';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public changeAvatar(imageBlob: string | ArrayBuffer | null) {
    const token = this.tokenService.getUserToken();
    return this.http
      .patch(
        environment.apiUrl + `/management/change/avatar`,
        {
          imageBlob,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .pipe(take(1));
  }

  public changePassword(newPassword: string) {
    const token = this.tokenService.getUserToken();
    return this.http
      .patch(
        environment.apiUrl + `/management/change/password`,
        {
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .pipe(take(1));
  }
}
