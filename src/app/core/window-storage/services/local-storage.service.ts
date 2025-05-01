import { Injectable } from '@angular/core'
import { LocalStorageKey } from '../types'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: LocalStorageKey, value: string): void {
    localStorage.setItem(key, value)
  }

  getItem(key: LocalStorageKey): string | null {
    return localStorage.getItem(key)
  }

  removeItem(key: LocalStorageKey): void {
    localStorage.removeItem(key)
  }

  clear(): void {
    localStorage.clear()
  }
}
