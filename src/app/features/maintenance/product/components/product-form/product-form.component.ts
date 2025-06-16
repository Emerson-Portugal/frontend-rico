import { Component, computed, effect, inject, input, model, viewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../../services'
import { CreateProductDto, UpdateProductDto } from '../../models'
import { EditViewModeEnum } from '@shared/constants'
import { ProductHeaderComponent } from './product-header/product-header.component'
import { ProductBodyComponent } from './product-body/product-body.component'
import { CustomLayoutComponent } from '@shared/components'

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ProductHeaderComponent, ProductBodyComponent, CustomLayoutComponent],
  templateUrl: './product-form.component.html',
  styles: ``
})
export class ProductFormComponent {
  private readonly productService = inject(ProductService)
  private readonly snackBar = inject(MatSnackBar)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  code = input<string>('')
  product = model<CreateProductDto | UpdateProductDto>({
    code: this.code() ,
    name: '',
    day: 0,
    type: ''
  })

  showToolbar = input<boolean>(true)
  showBreadcrumbs = input<boolean>(true)
  showActionButtons = input<boolean>(true)
  showHeader = model<boolean>(true)
  editViewMode = model<EditViewModeEnum>(EditViewModeEnum.VIEW_ONLY)
  isCreate = computed(() => !this.code())
  canEdit = computed(() => this.editViewMode() !== EditViewModeEnum.VIEW_ONLY)
  child = viewChild(ProductBodyComponent)
  private fetchProductEffect = effect(() => {
    if (!this.code()) return

    this.getByCode()
    this.fetchProductEffect.destroy()
  })
  getByCode() {
    this.productService.getByCode(this.code()).subscribe({
      next: ({ data }) => {
        this.product.set({
          code: data.code,
          name: data.name,
          day: data.day,
          type: data.type,
        })
      },
    })
  }
  onSaveElement() {
    const product = this.product()
    if (!product) return

    if (this.isCreate()) {
      this.productService.create(product).subscribe({
        next: () => {
          this.snackBar.open('El producto se creo correctamente', 'OK', { duration: 3_000 })
          this.onCleanUp()
        },
      })
      return
    }
    this.productService.update(this.code(), product).subscribe({
      next: () => {
        this.snackBar.open('El producto se actualizo correctamente', 'OK', { duration: 3_000 })
        this.onCleanUp()
      },
    })
  }
  onDeleteElement() {
    this.productService.delete(this.code()).subscribe({
      next: () => {
        this.snackBar.open('El producto se elimino correctamente', 'OK', { duration: 3_000 })
        this.router.navigate(['../../'], { relativeTo: this.route })
      },
    })
  }
  onCleanUp() {
    if (this.isCreate()) {
      this.product.set({
        code: '',
        name: '',
        day: 0,
        type: '',
      })
      this.child()?.form.reset()
      return
    }

    this.editViewMode.set(EditViewModeEnum.VIEW_ONLY)
  }











}
