import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, tap, throwError } from 'rxjs'
import { TokenService } from '../services/token.service'

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next, tokenService = inject(TokenService), router = inject(Router)) => {
  const refreshToken = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    return next(req).pipe(
      tap({
        error: () => {
          tokenService.clearToken()
          router.navigate(['auth', 'login'])
        }
      })
    )
  }

  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && tokenService.tokenExists() && error.status === 401) return refreshToken(req, next)
      return throwError(() => error)
    }),
  )
}
