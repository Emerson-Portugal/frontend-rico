import { Observable, tap } from 'rxjs'
import { inject, Injectable } from '@angular/core'
import { SuccessfulResponse } from '@core/api/models'
import { ApiService } from '@core/api/services/api.service'
import { TokenService } from '@core/token/services/token.service'
import { TokenDto } from '@core/token/models'
import { AccountDto, CredentialDto } from '../models'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenService = inject(TokenService)
  private readonly api = inject(ApiService)

  login(credentials: CredentialDto): Observable<SuccessfulResponse<TokenDto>> {
    return this.api.post<TokenDto>('shared/authentication', credentials).pipe(
      tap(({ data }) => this.tokenService.setToken(data.token))
    )
  }

  getAccountSession(): Observable<SuccessfulResponse<AccountDto>> {  
    return this.api.get<AccountDto>('shared/accounts/GetAccountSession')
  }
}
