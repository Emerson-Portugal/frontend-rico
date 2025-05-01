import { inject } from '@angular/core'
import { CanActivateChildFn, Router } from '@angular/router'
import { TokenService } from '../services/token.service'

export const tokenGuard: CanActivateChildFn = (childRoute, state, tokenService = inject(TokenService)) => {
  if (tokenService.tokenExists()) return true

  return inject(Router).createUrlTree(['auth', 'login'])
}
