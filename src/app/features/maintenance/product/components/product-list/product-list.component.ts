import { Component, inject, input, output, signal } from '@angular/core'
import { ProductDto } from '../../models'
import { CustomBehaviourEnum } from '@shared/constants'
import { Paginator } from '@shared/models'
import { ProductService } from '../../services'
import { TableColumn } from '@vex/interfaces/table-column.interface'
import { HttpParams } from '@angular/common/http'
import { CustomTableComponent } from '@shared/components'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './product-list.component.html',
  styles: ``
})
export class ProductListComponent {

  private readonly productService = inject(ProductService)

  title = 'Tipo de Producto'
  columns: TableColumn<ProductDto>[] = [
    {
      label: 'ID',
      property: 'id',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'Codigo',
      property: 'code',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'Nombre',
      property: 'name',
      type: 'text',
      visible: true,
    },
    {
      label: 'Dias de Vida',
      property: 'day',
      type: 'text',
      visible: true,
    },
    {
      label: 'Tipo',
      property: 'type',
      type: 'text',
      visible: true,
    },
  ]
  paginator = signal<Paginator>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  })
  products = signal<ProductDto[]>([])
  getSelectedBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.KEEP_BEHAVIOUR)
  getSelected = output<ProductDto>()
  createBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.KEEP_BEHAVIOUR)
  create = output<void>()

  ngOnInit(): void {
    this.getAll()
  }

  getAll(searchTerm: string = '') {
    const paginator = this.paginator()
    const params = new HttpParams()
      .set('page', paginator.currentPage)
      .set('pageSize', paginator.pageSize)
      .set('name', searchTerm)


    this.productService.getAll(params).subscribe({
      next: ({ data }) => {
        this.products.set(data.results)
        console.log('Products:', this.products())
        this.paginator.set({
          currentPage: data.pageNumber,
          pageSize: data.pageSize,
          totalCount: data.totalCount,
          totalPages: data.totalPages,
        })
      },
    })
  }
  onCurrentPageChange(page: number) {
    this.paginator.update(cur => ({ ...cur, currentPage: page }))
    this.getAll()
  }
  onSearchByText(searchTerm: string) {
    this.paginator.update(cur => ({ ...cur, currentPage: 1 }))
    this.getAll(searchTerm)
  }


}
