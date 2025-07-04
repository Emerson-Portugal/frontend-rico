import { Component, computed, effect, inject, input, model, OnDestroy, OnInit, signal, viewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { CreateMachineR145Dto, MachineR145Dto, UpdateMachineR145Dto } from '../../models'
import { MachineR145Service } from '../../services'
import { EditViewModeEnum } from '@shared/constants'
import { CustomLayoutComponent } from '@shared/components'
import { MachineR145FormHeaderComponent } from './machine-r145-form-header/machine-r145-form-header.component'
import { MachineR145FormBodyComponent } from './machine-r145-form-body/machine-r145-form-body.component'
import {MachineR145FormDetailComponent } from '../machine-r145-form-detail/machine-r145-form-detail.component'

import { NEW_GENERAL, MachineTabEnum } from '../../constants'
import { Tab } from '@shared/models'



@Component({
  selector: 'app-machine-r145-form',
  standalone: true,
  imports: [
    CustomLayoutComponent,
    MachineR145FormBodyComponent,
    MachineR145FormHeaderComponent,
    MachineR145FormDetailComponent

],
  templateUrl: './machine-r145-form.component.html',
  styles: ``
})
export class MachineR145FormComponent{


  private readonly machineR145Service = inject(MachineR145Service)
  private readonly snackBar = inject(MatSnackBar)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)


  MachineTabEnum = MachineTabEnum
  tabsCreate = signal<Tab[]>([
    { label: MachineTabEnum.FASE_1, onClick: this.onTabClick.bind(this, MachineTabEnum.FASE_1), active: true, disabled: false },
    { label: MachineTabEnum.FASE_2, onClick: this.onTabClick.bind(this, MachineTabEnum.FASE_2), active: false, disabled: true },
  ])
  tabsUpdate = computed<Tab[]>(() => this.tabsCreate().map(tab => ({ ...tab, disabled: false })))
  currentTab = computed<MachineTabEnum>(() => this.tabsCreate().find(tab => tab.active)?.label as MachineTabEnum)





  code = input<string>('')
  machineR145 = model<CreateMachineR145Dto | UpdateMachineR145Dto>(NEW_GENERAL)
  machineR145Data = signal<MachineR145Dto | null>(null)
  showToolbar = input<boolean>(true)
  showBreadcrumbs = input<boolean>(true)
  showActionButtons = input<boolean>(true)
  showHeader = model<boolean>(true)
  editViewMode = model<EditViewModeEnum>(EditViewModeEnum.VIEW_ONLY)
  isCreate = computed(() => !this.code())
  canEdit = computed(() => this.editViewMode() !== EditViewModeEnum.VIEW_ONLY)
  child = viewChild(MachineR145FormBodyComponent)

  private fetchCustomerEffect = effect(() => {
    if (!this.code()) return

    this.getByCode()
    this.fetchCustomerEffect.destroy()
  })

  getByCode() {
    this.machineR145Service.getByCode(this.code()).subscribe({
      next: ({ data }) => {
        this.machineR145Data.set(data)
        this.machineR145.set({

          producto: String(data.producto.code),
          maquina: String(data.maquina),
          turno: String(data.turno),

          fecha: data.fecha,
          hora_inicio: data.hora_inicio,
          hora_fin: data.hora_fin,
          unidad_kilos: data.unidad_kilos,

          lote_anio: data.lote_anio,
          lote_sem: data.lote_sem,
          lote_dme: data.lote_dme,

          extension_dia: data.extension_dia,
          extension_dmp: data.extension_dmp,
          extension_hora: data.extension_hora,
          vencimiento: data.vencimiento,

          golpe: data.golpe,
          recor: data.recor,

          peso: data.peso,
          vacio: data.vacio,
          dm: data.dm,

          observaciones: data.observaciones,


        })

        console.log('Error al obtener el R145: ', data)

      },
    })
  }


  onSaveElement() {
    this.saveCustomer()
  }

  saveCustomer() {
    const machineR145 = this.machineR145()
    if (!machineR145) return

    if (this.isCreate()) {
      this.machineR145Service.create(machineR145 as CreateMachineR145Dto).subscribe({
        next: () => {
          this.snackBar.open('El producto se creo correctamente', 'OK', { duration: 3_000 })
          
          //this.notificationsService.sendMessage({ message: 'Nuevo registro R145 creado' });

          this.router.navigate(['../'], { relativeTo: this.route })
        },
        error: (err) => {
          const errors = err?.error;
          if (errors && typeof errors === 'object') {
            const messages = Object.values(errors).flat().join('\n');
            this.snackBar.open(messages, 'OK', { duration: 5_000 });
          } else {
            this.snackBar.open('Error', 'OK', { duration: 5_000 });
          }
        }
      })
      return
    }
    this.machineR145Service.update(this.code(), machineR145).subscribe({
      next: () => {
        this.snackBar.open('Se actualizo correctamente', 'OK', { duration: 3_000 })
        this.router.navigate(['../../'], { relativeTo: this.route })
      },
      error: (err) => {
        const errors = err?.error;
        if (errors && typeof errors === 'object') {
          const messages = Object.values(errors).flat().join('\n');
          this.snackBar.open(messages, 'OK', { duration: 5_000 });
        } else {
          this.snackBar.open('Error', 'OK', { duration: 5_000 });
        }
      }
    })
  }

  onDeleteElement() {
    this.machineR145Service.delete(this.code()).subscribe({
      next: () => {
        this.snackBar.open('Se elimino correctamente', 'OK', { duration: 3_000 })
        this.router.navigate(['../../'], { relativeTo: this.route })
      },
    })
  }

  onTabClick(tabToDisplay: MachineTabEnum) {
    this.tabsCreate.update(cur => cur.map((tab) => ({ ...tab, active: tab.label === tabToDisplay })))
  }



}
