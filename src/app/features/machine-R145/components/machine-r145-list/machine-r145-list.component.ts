import { Component, inject, input, output, signal } from '@angular/core'
import { MachineR145Dto } from '../../models'
import { CustomBehaviourEnum } from '@shared/constants'
import { Paginator } from '@shared/models'
import { MachineR145Service } from '../../services'
import { TableColumn } from '@vex/interfaces/table-column.interface'
import { HttpParams } from '@angular/common/http'
import { CustomTableComponent } from '@shared/components'
@Component({
  selector: 'app-machine-r145-list',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './machine-r145-list.component.html',
  styles: ``
})
export class MachineR145ListComponent {


  private readonly machineR145Service = inject(MachineR145Service)
  title = 'Lista de Productos'
  columns: TableColumn<MachineR145Dto>[] = [
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
    }
  ]
  paginator = signal<Paginator>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  })
  machinesR145 = signal<MachineR145Dto[]>([])
  getSelectedBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.KEEP_BEHAVIOUR)
  getSelected = output<MachineR145Dto>()
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


    this.machineR145Service.getAll(params).subscribe({
      next: ({ data }) => {
        this.machinesR145.set(data.results)
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

