import { Component, OnInit, inject, signal, input, output } from '@angular/core'
import { HttpParams } from '@angular/common/http'
import { CustomTableComponent } from '@shared/components'
import { CustomBehaviourEnum } from '@shared/constants'
import { Paginator } from '@shared/models'
import { TableColumn } from '@vex/interfaces/table-column.interface'
import { OperatorLogDto } from '../../models' // Asegúrate de tener definido el modelo SectorDto
import { ProductLogService } from '../../services' // Servicio para obtener los sectores
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-operator-log-list',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './operator-log-list.component.html',
  styles: ``
})
export class OperatorLogListComponent {


  private readonly productLogService = inject(ProductLogService);

  title = 'Cotizacion';
  columns: TableColumn<OperatorLogDto>[] = [
    {
      label: 'Código',
      property: 'codigo',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },

  ];

  paginator = signal<Paginator>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  });
  operatorLog = signal<OperatorLogDto[]>([]);
  getSelectedBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.KEEP_BEHAVIOUR);
  getSelected = output<OperatorLogDto>();
  createBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.KEEP_BEHAVIOUR);
  create = output<void>();

  ngOnInit(): void {
    this.getAll() // Llamamos a la función para cargar los sectores
  }

  getAll(searchTerm: string = '') {
    const paginator = this.paginator()
    const params = new HttpParams()
      .set('page', paginator.currentPage)
      .set('pageSize', paginator.pageSize)
      .set('filterBySearchLike', searchTerm)

    this.productLogService.getAll(params).subscribe({
      next: ({ data }) => {
        const formattedQuotations = data.results.map((quotation: any) => ({
          ...quotation,
        }))

        this.operatorLog.set(formattedQuotations)

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
    this.paginator.update((cur) => ({ ...cur, currentPage: page }))
    this.getAll()
  }
  onSearchByText(searchTerm: string) {
    this.paginator.update(cur => ({ ...cur, currentPage: 1 }))
    this.getAll(searchTerm)
  }  



}
