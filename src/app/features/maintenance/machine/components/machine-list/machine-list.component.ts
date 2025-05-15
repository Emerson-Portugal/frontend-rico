import { Component, inject, input, output, signal } from '@angular/core'
import { MachineDto } from '../../models'
import { CustomBehaviourEnum } from '@shared/constants'
import { Paginator } from '@shared/models'
import { MachineService } from '../../services'
import { TableColumn } from '@vex/interfaces/table-column.interface'
import { HttpParams } from '@angular/common/http'
import { CustomTableComponent } from '@shared/components'
@Component({
  selector: 'app-machine-list',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './machine-list.component.html',
  styles: ``
})
export class MachineListComponent {

  private readonly machineService = inject(MachineService)
  title = 'Tipo de Maquina'
  columns: TableColumn<MachineDto>[] = [
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
  ]
  paginator = signal<Paginator>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  })
  machines = signal<MachineDto[]>([])
  getSelectedBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.KEEP_BEHAVIOUR)
  getSelected = output<MachineDto>()
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
      .set('Name', searchTerm)


    this.machineService.getAll(params).subscribe({
      next: ({ data }) => {
        this.machines.set(data.results)
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
