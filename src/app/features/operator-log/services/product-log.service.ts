import { HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ApiService } from '@core/api/services/api.service'
import {OperatorLogDto, CreateOperatorLogDto} from '../models'

@Injectable({
  providedIn: 'root',
})

export class ProductLogService {
  private readonly api = inject(ApiService)
  private url = 'operator-log'

  getAll(params?: HttpParams) {
    return this.api.getAll<OperatorLogDto>(this.url, params)
  }

  getByCode(code: string) {
    return this.api.get<OperatorLogDto>(`${this.url}/${code}`)
  }

 create(generalFee: CreateOperatorLogDto) {
    return this.api.post(this.url, generalFee)
  }
/*  
  update(code: string, generalFee: UpdateQuotationDto) {
    return this.api.put(`${this.url}/${code}`, generalFee)
  }

  delete(code: string) {
    return this.api.delete(`${this.url}/${code}`)
  } */
}
