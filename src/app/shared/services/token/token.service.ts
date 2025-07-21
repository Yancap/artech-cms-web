import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'platform',
})
export class TokenService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getUserToken() {
    if (this.isBrowser()) {
      return sessionStorage.getItem('token');
    }
    return "";
  }

  setUserToken(token: string) {
    if (this.isBrowser()) {
      sessionStorage.setItem('token', token);
    }
  }


  resetUserToken() {
    if (this.isBrowser()) {
      sessionStorage.removeItem('token');
    }
  }
}
