import { Component, inject, input, output, signal } from '@angular/core'
import { ShiftDto } from '../../models'
import { CustomBehaviourEnum } from '@shared/constants'
import { Paginator } from '@shared/models'
import { ShiftService } from '../../services'
import { TableColumn } from '@vex/interfaces/table-column.interface'
import { HttpParams } from '@angular/common/http'
import { CustomTableComponent } from '@shared/components'

@Component({
  selector: 'app-shift-list',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './shift-list.component.html',
  styles: ``
})
export class ShiftListComponent {

  private readonly shiftService = inject(ShiftService)
  title = 'Tipo de Turno'
  columns: TableColumn<ShiftDto>[] = [
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
      property: 'shift',
      type: 'text',
      visible: true,
    },
    {
      label: 'Hora Inicio',
      property: 'start_time',
      type: 'text',
      visible: true,
    },
    {
      label: 'Hora Fin',
      property: 'end_time',
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
  shifts = signal<ShiftDto[]>([])
  getSelectedBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.KEEP_BEHAVIOUR)
  getSelected = output<ShiftDto>()
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
      .set('shift', searchTerm)


    this.shiftService.getAll(params).subscribe({
      next: ({ data }) => {
        this.shifts.set(data.results)
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
