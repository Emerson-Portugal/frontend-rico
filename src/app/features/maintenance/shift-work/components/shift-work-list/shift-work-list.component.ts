import { Component, inject, input, output, signal } from '@angular/core'
import { ShiftWorkDto } from '../../models'
import { CustomBehaviourEnum } from '@shared/constants'
import { Paginator } from '@shared/models'
import { ShiftWorkService } from '../../services'
import { TableColumn } from '@vex/interfaces/table-column.interface'
import { HttpParams } from '@angular/common/http'
import { CustomTableComponent } from '@shared/components'

@Component({
  selector: 'app-shift-work-list',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './shift-work-list.component.html',
  styles: ``
})
export class ShiftWorkListComponent {

  private readonly shiftWorkService = inject(ShiftWorkService)

  title = 'Tipo de Turno'
  columns: TableColumn<ShiftWorkDto>[] = [
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
      label: 'Turno',
      property: 'turno.shift',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'Fecha Inicio',
      property: 'fecha_inicio',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'Fecha Fin',
      property: 'fecha_fin',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },

  ]
  paginator = signal<Paginator>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  })
  shiftWorks = signal<ShiftWorkDto[]>([])
  getSelectedBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.KEEP_BEHAVIOUR)
  getSelected = output<ShiftWorkDto>()
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


    this.shiftWorkService.getAll(params).subscribe({
      next: ({ data }) => {
        this.shiftWorks.set(data.results)
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
