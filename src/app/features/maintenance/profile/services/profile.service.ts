import { HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ApiService } from '@core/api/services/api.service'
import { CreateProfileDto, ProfileDto, UpdateProfileDto } from '../models'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly api = inject(ApiService)
  private url = 'login/users'

  getAll(params?: HttpParams) {
    return this.api.getAll<ProfileDto>(`${this.url}/`, params)
  }

  getByCode(id: string) {
    return this.api.get<ProfileDto>(`${this.url}/${id}`)
  }

  create(account: CreateProfileDto) {
    return this.api.post(`${this.url}/register`, account)
  }

  update(id: string, account: UpdateProfileDto) {
    return this.api.put(`${this.url}/${id}/update/`, account)
  }

  delete(id: string) {
    return this.api.delete(`${this.url}/${id}/delete/`)
  }
}
