import { inject, Injectable } from '@angular/core'
import { ApiService } from '@core/api/services/api.service'
import { ConfigurationDto } from '@shared/models'

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private readonly api = inject(ApiService)
  private url = 'shared/configurations'

  get() {
    return this.api.get<ConfigurationDto>(`${this.url}`)
  }
}
