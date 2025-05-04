import { inject } from '@angular/core'
import { CanActivateChildFn, Router } from '@angular/router'
import { TokenService } from '../services/token.service'

export const tokenGuard: CanActivateChildFn = (childRoute, state, tokenService = inject(TokenService)) => {
  const exists = tokenService.tokenExists()
  console.log('¿Token existe?', exists)
  if (exists) return true

  return inject(Router).createUrlTree(['auth', 'login'])
}

