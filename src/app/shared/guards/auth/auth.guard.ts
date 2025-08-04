import { TokenService } from '../../services/token/token.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getUserToken();
  if (!token) {
    return router.navigateByUrl('/login');
  }
  return true;
};
