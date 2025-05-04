import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { TokenService } from '../services/token.service'

export const addTokenInterceptor: HttpInterceptorFn = (req, next, tokenService = inject(TokenService)) => {
  let modifiedReq = req.clone({
    headers: req.headers
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Expires', '0'),
  })
  if (tokenService.tokenExists()) {
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.set('Authorization', `Token ${tokenService.getToken()}`),
    })
  }

  return next(modifiedReq)
}
