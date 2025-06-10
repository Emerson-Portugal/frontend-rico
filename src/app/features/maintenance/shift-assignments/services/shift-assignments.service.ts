import { inject, Injectable } from '@angular/core'
import { ApiService } from '@core/api/services/api.service'
import { CreateShiftAssignmentDto, ShiftAssignmentDto, UpdateShiftAssignmentDto } from '../models'
import { HttpParams } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ShiftAssignmentsService {

  private readonly api = inject(ApiService)
  private url = 'produccion/asignaciones-turno'

  getAll(params?: HttpParams) {
    return this.api.getAll<ShiftAssignmentDto>(`${this.url}/`, params)
  }

  getByCode(code: string) {
    return this.api.get<ShiftAssignmentDto>(`${this.url}/${code}/`)
  }

  create(accounttype: CreateShiftAssignmentDto) {
    return this.api.post(`${this.url}/`, accounttype)
  }

  update(code: string, accounttype: UpdateShiftAssignmentDto) {
    return this.api.put(`${this.url}/${code}/`, accounttype)
  }

  delete(code: string) {
    return this.api.delete(`${this.url}/${code}/`)
  }


  // por nombre
  getByName(name: string) {
    return this.api.get<ShiftAssignmentDto>(`${this.url}/por-usuario/${name}/`)
  }

}
