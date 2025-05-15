import { inject, Injectable } from '@angular/core'
import { ApiService } from '@core/api/services/api.service'
import { CreateProductDto, ProductDto, UpdateProductDto } from '../models'
import { HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly api = inject(ApiService)
  private url = 'produccion/productos'

  getAll(params?: HttpParams) {
    return this.api.getAll<ProductDto>(`${this.url}/`, params)
  }

  getByCode(code: string) {
    return this.api.get<ProductDto>(`${this.url}/${code}/`)
  }

  create(accounttype: CreateProductDto) {
    return this.api.post(`${this.url}/`, accounttype)
  }

  update(code: string, accounttype: UpdateProductDto) {
    return this.api.put(`${this.url}/${code}/`, accounttype)
  }

  delete(code: string) {
    return this.api.delete(`${this.url}/${code}/`)
  }

}
