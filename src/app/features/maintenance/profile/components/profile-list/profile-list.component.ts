import { Component, inject, input, OnInit, output, signal } from '@angular/core'
import { HttpParams } from '@angular/common/http'
import { CustomTableComponent } from '@shared/components'
import { CustomBehaviourEnum } from '@shared/constants'
import { Paginator } from '@shared/models'
import { TableColumn } from '@vex/interfaces/table-column.interface'

import { ProfileDto } from '../../models'
import { ProfileService } from '../../services'

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './profile-list.component.html',
  styles: ``
})
export class ProfileListComponent {

  private readonly profileService = inject(ProfileService)

  title = 'Perfil de Usuario'
  columns: TableColumn<ProfileDto>[] = [
    {
      label: 'ID',
      property: 'id',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'Nombre Clave',
      property: 'username',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'Nombre Completo',
      property: 'full_name',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'Rol',
      property: 'role',
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
  showCreateButton = input<boolean>(true)
  profiles = signal<ProfileDto[]>([])
  getSelectedBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.KEEP_BEHAVIOUR)
  getSelected = output<ProfileDto>()
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
  
    this.profileService.getAll(params).subscribe({
      next: ({ data }) => {
        
        
        const filteredResults = data.results.filter(user => user.role === "OPERADOR" || user.role === "AUXILIAR" || user.role === "REVISADOR");
        console.log(filteredResults)
        this.profiles.set(filteredResults);
        this.paginator.set({
          currentPage: data.pageNumber,
          pageSize: data.pageSize,
          totalCount: filteredResults.length, // Ajustar el total según los filtrados
          totalPages: Math.ceil(filteredResults.length / data.pageSize),
        });
      },
    });
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
