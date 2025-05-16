import { Component, computed, effect, inject, input, model, viewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { ShiftService } from '../../services/'
import { CreateShiftDto, UpdateShiftDto} from '../../models'
import { EditViewModeEnum } from '@shared/constants'
import { ShiftFormHeaderComponent } from './shift-form-header/shift-form-header.component'
import { ShiftFormBodyComponent } from './shift-form-body/shift-form-body.component'
import { CustomLayoutComponent } from '@shared/components'


@Component({
  selector: 'app-shift-form',
  standalone: true,
  imports: [ShiftFormHeaderComponent, ShiftFormBodyComponent, CustomLayoutComponent],
  templateUrl: './shift-form.component.html',
  styles: ``
})
export class ShiftFormComponent {

  private readonly shiftService = inject(ShiftService)
  private readonly snackBar = inject(MatSnackBar)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  code = input<string>('')
  shifts = model<CreateShiftDto | UpdateShiftDto>({
    shift: '',
    start_time: '',
    end_time: '',
  })
  showToolbar = input<boolean>(true)
  showBreadcrumbs = input<boolean>(true)
  showActionButtons = input<boolean>(true)
  showHeader = model<boolean>(true)
  editViewMode = model<EditViewModeEnum>(EditViewModeEnum.VIEW_ONLY)
  isCreate = computed(() => !this.code())
  canEdit = computed(() => this.editViewMode() !== EditViewModeEnum.VIEW_ONLY)
  child = viewChild(ShiftFormBodyComponent)
  private fetchShiftEffect = effect(() => {
    if (!this.code()) return

    this.getByCode()
    this.fetchShiftEffect.destroy()
  })
  getByCode() {
    this.shiftService.getByCode(this.code()).subscribe({
      next: ({ data }) => {
        this.shifts.set({
          shift: data.shift,
          start_time: data.start_time,
          end_time: data.end_time,
        })
      },
    })
  }
  onSaveElement() {
    const shifts = this.shifts()
    if (!shifts) return

    if (this.isCreate()) {
      this.shiftService.create(shifts).subscribe({
        next: () => {
          this.snackBar.open('El turno se creo correctamente', 'OK', { duration: 3_000 })
          this.onCleanUp()
        },
      })
      return
    }
    this.shiftService.update(this.code(), shifts).subscribe({
      next: () => {
        this.snackBar.open('El turno se actualizo correctamente', 'OK', { duration: 3_000 })
        this.onCleanUp()
      },
    })
  }
  onDeleteElement() {
    this.shiftService.delete(this.code()).subscribe({
      next: () => {
        this.snackBar.open('El turno se elimino correctamente', 'OK', { duration: 3_000 })
        this.router.navigate(['../../'], { relativeTo: this.route })
      },
    })
  }
  onCleanUp() {
    if (this.isCreate()) {
      this.shifts.set({
        shift: '',
        start_time: '',
        end_time: '',
      })
      this.child()?.form.reset()
      return
    }

    this.editViewMode.set(EditViewModeEnum.VIEW_ONLY)
  }
}
