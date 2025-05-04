import { Injectable, inject } from '@angular/core'
import { LocalStorageService } from '@core/window-storage/services'

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly localStorageService = inject(LocalStorageService)

  tokenExists(): boolean {
    return !!this.localStorageService.getItem('access_token')
  }

  getToken(): string {
    return this.localStorageService.getItem('access_token') ?? ''
  }

  setToken(accessToken: string): void {
    this.localStorageService.setItem('access_token', accessToken)
    
    console.log('Token guardado:', accessToken)
  }

  clearToken(): void {
    this.localStorageService.removeItem('access_token')
  }

  setRole(role: string): void {
    this.localStorageService.setItem('user_role', role)
  }

  getRole(): string | null {
    return this.localStorageService.getItem('user_role')
  }



}
