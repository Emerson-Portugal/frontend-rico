import { inject, Injectable } from '@angular/core'
import { ApiService } from '@core/api/services/api.service'
import { CreateMachineDto, MachineDto, UpdateMachineDto } from '../models'
import { HttpParams } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private readonly api = inject(ApiService)
  private url = 'produccion/maquinas'

  getAll(params?: HttpParams) {
    return this.api.getAll<MachineDto>(`${this.url}/`, params)
  }

  getByCode(code: string) {
    return this.api.get<MachineDto>(`${this.url}/${code}/`)
  }

  create(accounttype: CreateMachineDto) {
    return this.api.post(`${this.url}/`, accounttype)
  }

  update(code: string, accounttype: UpdateMachineDto) {
    return this.api.put(`${this.url}/${code}/`, accounttype)
  }

  delete(code: string) {
    return this.api.delete(`${this.url}/${code}/`)
  }

}
