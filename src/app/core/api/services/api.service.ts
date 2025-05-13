import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { environment } from '@environments/environment'
import { Observable, timeout } from 'rxjs'
import { GetAllSuccessfulResponse, SuccessfulResponse } from '../models'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly milliSecondsUntilTimeout = 5_000
  private readonly API_BASE_URL = `${environment.apiBaseUrl}/login/`
  private readonly http = inject(HttpClient)

  get<T>(path: string, params?: HttpParams): Observable<SuccessfulResponse<T>> {
    return this.http.get<SuccessfulResponse<T>>(`${this.API_BASE_URL}${path}`, { params }).pipe(timeout(this.milliSecondsUntilTimeout))
  }

  getAll<T>(path: string, params?: HttpParams): Observable<GetAllSuccessfulResponse<T>> {
    return this.http.get<GetAllSuccessfulResponse<T>>(`${this.API_BASE_URL}${path}`, { params }).pipe(timeout(this.milliSecondsUntilTimeout))
  }

  getFile(path: string, params?: HttpParams): Observable<Blob> {
    return this.http.get(`${this.API_BASE_URL}${path}`, { params, responseType: 'blob' })
  }

  post<T = string>(path: string, data: {}): Observable<SuccessfulResponse<T>> {
    return this.http.post<SuccessfulResponse<T>>(`${this.API_BASE_URL}${path}`, data).pipe(timeout(this.milliSecondsUntilTimeout))
  }

  put<T = boolean>(path: string, data?: {}): Observable<SuccessfulResponse<T>> {
    return this.http.put<SuccessfulResponse<T>>(`${this.API_BASE_URL}${path}`, data).pipe(timeout(this.milliSecondsUntilTimeout))
  }

  patch<T = boolean>(path: string, data?: {}): Observable<SuccessfulResponse<T>> {
    return this.http.patch<SuccessfulResponse<T>>(`${this.API_BASE_URL}${path}`, data).pipe(timeout(this.milliSecondsUntilTimeout))
  }

  delete<T = boolean>(path: string): Observable<SuccessfulResponse<T>> {
    return this.http.delete<SuccessfulResponse<T>>(`${this.API_BASE_URL}${path}`).pipe(timeout(this.milliSecondsUntilTimeout))
  }
}
