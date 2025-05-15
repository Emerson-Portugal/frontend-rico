import { Component, computed, effect, inject, input, model, viewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { MachineService } from '../../services/'
import { CreateMachineDto, UpdateMachineDto} from '../../models'
import { EditViewModeEnum } from '@shared/constants'
import { MachineFormHeaderComponent } from './machine-form-header/machine-form-header.component'
import { MachineFormBodyComponent } from './machine-form-body/machine-form-body.component'
import { CustomLayoutComponent } from '@shared/components'

@Component({
  selector: 'app-machine-form',
  standalone: true,
  imports: [MachineFormHeaderComponent, MachineFormBodyComponent, CustomLayoutComponent],
  templateUrl: './machine-form.component.html',
  styles: ``
})
export class MachineFormComponent {

  private readonly machineService = inject(MachineService)
  private readonly snackBar = inject(MatSnackBar)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  code = input<string>('')
  machine = model<CreateMachineDto | UpdateMachineDto>({
    name: '',
  })
  showToolbar = input<boolean>(true)
  showBreadcrumbs = input<boolean>(true)
  showActionButtons = input<boolean>(true)
  showHeader = model<boolean>(true)
  editViewMode = model<EditViewModeEnum>(EditViewModeEnum.VIEW_ONLY)
  isCreate = computed(() => !this.code())
  canEdit = computed(() => this.editViewMode() !== EditViewModeEnum.VIEW_ONLY)
  child = viewChild(MachineFormBodyComponent)
  private fetchMachineEffect = effect(() => {
    if (!this.code()) return

    this.getByCode()
    this.fetchMachineEffect.destroy()
  })
  getByCode() {
    this.machineService.getByCode(this.code()).subscribe({
      next: ({ data }) => {
        this.machine.set({
          name: data.name,
        })
      },
    })
  }
  onSaveElement() {
    const machine = this.machine()
    if (!machine) return

    if (this.isCreate()) {
      this.machineService.create(machine).subscribe({
        next: () => {
          this.snackBar.open('La máquina se creo correctamente', 'OK', { duration: 3_000 })
          this.onCleanUp()
        },
      })
      return
    }
    this.machineService.update(this.code(), machine).subscribe({
      next: () => {
        this.snackBar.open('La máquina se actualizo correctamente', 'OK', { duration: 3_000 })
        this.onCleanUp()
      },
    })
  }
  onDeleteElement() {
    this.machineService.delete(this.code()).subscribe({
      next: () => {
        this.snackBar.open('La máquina se elimino correctamente', 'OK', { duration: 3_000 })
        this.router.navigate(['../../'], { relativeTo: this.route })
      },
    })
  }
  onCleanUp() {
    if (this.isCreate()) {
      this.machine.set({
        name: '',
      })
      this.child()?.form.reset()
      return
    }

    this.editViewMode.set(EditViewModeEnum.VIEW_ONLY)
  }
}
