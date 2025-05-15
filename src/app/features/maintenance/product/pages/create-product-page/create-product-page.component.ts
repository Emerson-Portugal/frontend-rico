import { Component } from '@angular/core'
import { CreateProductDto } from '../../models'
import { EditViewModeEnum } from '@shared/constants'
import { ProductFormComponent } from '../../components'

@Component({
  selector: 'app-create-product-page',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './create-product-page.component.html',
  styles: ``
})
export class CreateProductPageComponent {
  editViewMode = EditViewModeEnum.CREATE
  product: CreateProductDto = {
    code: '',
    name: '',
  }
}