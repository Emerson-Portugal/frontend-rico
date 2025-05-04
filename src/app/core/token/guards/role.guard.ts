import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { TokenService } from '../services/token.service'

export const roleGuard = (allowedRoles: string[]): CanActivateFn => () => {
  const tokenService = inject(TokenService)
  const router = inject(Router)

  const userRole = tokenService.getRole()?.toLowerCase()

  if (userRole && allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
    return true
  }

  // Si no, redirige al home
  return router.createUrlTree(['/home'])
}
