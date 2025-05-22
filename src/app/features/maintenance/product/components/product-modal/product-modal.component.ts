import { Component, inject, signal } from '@angular/core'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { ProductService } from '../../services'
import { CustomBehaviourEnum, EditViewModeEnum, ModalViewMode } from '@shared/constants'
import { ProductDto} from '../../models'
import { ProductListComponent } from '../product-list/product-list.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [ProductListComponent, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './product-modal.component.html',
  styles: ``
})
export class ProductModalComponent {
  public dialogRef = inject(MatDialogRef<this>)
  private readonly productService = inject(ProductService)

  title = 'Tipo de Producto'
  EditViewModeEnum = EditViewModeEnum
  CustomBehaviourEnum = CustomBehaviourEnum
  viewMode = signal<ModalViewMode>('list')

  onSelectElement(product: ProductDto) {
    this.dialogRef.close(product)
  }

  getProductByCode(code: string) {
    this.productService.getByCode(code).subscribe({
      next: ({ data }) => this.dialogRef.close(data),
    })
  }

  toggleViewMode() {
    this.viewMode.set('list')
  }
}
