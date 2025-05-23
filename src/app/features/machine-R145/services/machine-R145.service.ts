import { HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ApiService } from '@core/api/services/api.service'
import {CreateMachineR145Dto, MachineR145Dto, UpdateMachineR145Dto} from '../models'

@Injectable({
  providedIn: 'root',
})

export class MachineR145Service {
  private readonly api = inject(ApiService)
  private url = 'produccion/registrosR145'

  getAll(params?: HttpParams) {
    return this.api.getAll<MachineR145Dto>(`${this.url}/`, params)
  }

  getByCode(code: string) {
    return this.api.get<MachineR145Dto>(`${this.url}/${code}/`)
  }

 create(generalFee: CreateMachineR145Dto) {
    return this.api.post(`${this.url}/`, generalFee)
  }

  update(code: string, generalFee: UpdateMachineR145Dto) {
    return this.api.put(`${this.url}/${code}/`, generalFee)
  }

  delete(code: string) {
    return this.api.delete(`${this.url}/${code}/`)
  }
}
