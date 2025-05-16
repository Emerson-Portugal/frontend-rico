import { inject, Injectable } from '@angular/core'
import { ApiService } from '@core/api/services/api.service'
import { CreateShiftDto, ShiftDto, UpdateShiftDto } from '../models'
import { HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private readonly api = inject(ApiService)
  private url = 'produccion/turnos'

  getAll(params?: HttpParams) {
    return this.api.getAll<ShiftDto>(`${this.url}/`, params)
  }

  getByCode(code: string) {
    return this.api.get<ShiftDto>(`${this.url}/${code}/`)
  }

  create(accounttype: CreateShiftDto) {
    return this.api.post(`${this.url}/`, accounttype)
  }

  update(code: string, accounttype: UpdateShiftDto) {
    return this.api.put(`${this.url}/${code}/`, accounttype)
  }

  delete(code: string) {
    return this.api.delete(`${this.url}/${code}/`)
  }

}