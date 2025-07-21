import { TokenService } from '../../services/token/token.service';
import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanMatchFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getUserToken();
  if (!token) {
    return router.navigateByUrl('/login');
  }
  return true;
};
