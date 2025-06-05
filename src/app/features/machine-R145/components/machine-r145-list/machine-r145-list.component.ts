import { Component, inject, input, OnDestroy, OnInit, output, signal } from '@angular/core'
import { MachineR145Dto } from '../../models'
import { CustomBehaviourEnum } from '@shared/constants'
import { Paginator } from '@shared/models'
import { MachineR145Service } from '../../services'
import { TableColumn } from '@vex/interfaces/table-column.interface'
import { HttpParams } from '@angular/common/http'
import { CustomTableComponent } from '@shared/components'
import { NotificationsService } from '@core/websocket/services/notifications.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';




@Component({
  selector: 'app-machine-r145-list',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './machine-r145-list.component.html',
  styles: ``
})
export class MachineR145ListComponent {

  private readonly machineR145Service = inject(MachineR145Service)
  private readonly notificationsService = inject(NotificationsService);
  private readonly destroyRef = inject(DestroyRef);



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
    },
    {
      label: 'Fecha',
      property: 'fecha',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'Operario',
      property: 'operario.username',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'F. Operario',
      property: 'fecha_operario',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
      pipe: 'date'
    },
    {
      label: 'Revisor',
      property: 'revisador.username',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'F. Revisor',
      property: 'fecha_revisador',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
      pipe: 'date'
    },
    {
      label: 'Auxiliar',
      property: 'auxiliar.username',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
    },
    {
      label: 'F. Auxiliar',
      property: 'fecha_auxiliar',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium'],
      pipe: 'date'
    },
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




  ngOnInit() {
    console.log('[🔎] Componente MachineR145ListComponent montado');

    this.getAll();

    this.notificationsService.newNotification$
      .pipe(takeUntilDestroyed(this.destroyRef)) // ✅ FIX
      .subscribe(noti => {
        if (noti) {
          console.log('🔁 Notificación recibida, refrescando productos...');
          this.getAll();
        } else {
          console.log('❌ No hay notificación nueva, no se refresca la lista de productos.');
        }
      });
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

