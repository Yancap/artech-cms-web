import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { ArtechException } from '../../utils/errors/ArtechException';
import { TypeModal } from '../../models/enums/type-modal.enums';
import { TokenService } from '../../services/token/token.service';

export const adminGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getUserToken();
  if (token) {
    if (authService.userAccess['_buffer'].length === 0) {
      authService.getAccess().pipe(take(1)).subscribe();
    }
    return authService.userAccess.pipe(
      map((userData) => {
        if (userData.role === 'Admin') {
          return true;
        }
        throw new ArtechException({
          message: 'Permissão negada.',
          details: 'Você não tem acesso a essa funcionalidade.',
          scope: 'top',
          status: 401,
          type: TypeModal.WARNING,
        });
      })
    );
  }
  return router.navigateByUrl('/login');
};
