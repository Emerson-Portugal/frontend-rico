import { inject, Injectable } from '@angular/core'
import { ApiService } from '@core/api/services/api.service'
import { CreateShiftWorkDto, ShiftWorkDto, UpdateShiftWorkDto } from '../models'
import { HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ShiftWorkService {

  private readonly api = inject(ApiService)
  private url = 'produccion/turnos-trabajo'

  getAll(params?: HttpParams) {
    return this.api.getAll<ShiftWorkDto>(`${this.url}/`, params)
  }

  getByCode(code: string) {
    return this.api.get<ShiftWorkDto>(`${this.url}/${code}/`)
  }

  create(accounttype: CreateShiftWorkDto) {
    return this.api.post(`${this.url}/`, accounttype)
  }

  update(code: string, accounttype: UpdateShiftWorkDto) {
    return this.api.put(`${this.url}/${code}/`, accounttype)
  }

  delete(code: string) {
    return this.api.delete(`${this.url}/${code}/`)
  }

}

