import { Component, computed, effect, inject, input, model, viewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { ShiftAssignmentsService } from '../../services'
import { CreateShiftAssignmentDto, UpdateShiftAssignmentDto } from '../../models'
import { EditViewModeEnum } from '@shared/constants'
import { ShiftAssignmentsBodyComponent } from './shift-assignments-body/shift-assignments-body.component'
import { ShiftAssignmentsHeaderComponent } from './shift-assignments-header/shift-assignments-header.component'
import { CustomLayoutComponent } from '@shared/components'


@Component({
  selector: 'app-shift-assignments-form',
  standalone: true,
  imports: [ShiftAssignmentsBodyComponent, ShiftAssignmentsHeaderComponent, CustomLayoutComponent],
  templateUrl: './shift-assignments-form.component.html',
  styles: ``
})
export class ShiftAssignmentsFormComponent {


  private readonly shiftAssignmentsService = inject(ShiftAssignmentsService)
  private readonly snackBar = inject(MatSnackBar)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  code = input<string>('')
  shiftAssignments = model<CreateShiftAssignmentDto | UpdateShiftAssignmentDto>({
    code: this.code() ,
    id: 0,
    turno_trabajo: '',
    usuario: '',
  })

  showToolbar = input<boolean>(true)
  showBreadcrumbs = input<boolean>(true)
  showActionButtons = input<boolean>(true)
  showHeader = model<boolean>(true)
  editViewMode = model<EditViewModeEnum>(EditViewModeEnum.VIEW_ONLY)
  isCreate = computed(() => !this.code())
  canEdit = computed(() => this.editViewMode() !== EditViewModeEnum.VIEW_ONLY)
  child = viewChild(ShiftAssignmentsBodyComponent)
  private fetchShiftAssignmentsEffect = effect(() => {
    if (!this.code()) return

    this.getByCode()
    this.fetchShiftAssignmentsEffect.destroy()
  })
  getByCode() {
    this.shiftAssignmentsService.getByCode(this.code()).subscribe({
      next: ({ data }) => {
        this.shiftAssignments.set({
          code: data.code,
          id: data.id,
          turno_trabajo: String(data.turno_trabajo.code),
          usuario: String(data.usuario.id),
        })
      },



    })
  }
  onSaveElement() {
    const shiftAssignment = this.shiftAssignments()
    if (!shiftAssignment) return

    if (this.isCreate()) {
      this.shiftAssignmentsService.create(shiftAssignment).subscribe({
        next: () => {
          this.snackBar.open('El Turno se creo correctamente', 'OK', { duration: 3_000 })
          this.onCleanUp()
        },
      })
      return
    }
    this.shiftAssignmentsService.update(this.code(), shiftAssignment).subscribe({
      next: () => {
        this.snackBar.open('El Turno se actualizo correctamente', 'OK', { duration: 3_000 })
        this.onCleanUp()
      },
    })
  }
  onDeleteElement() {
    this.shiftAssignmentsService.delete(this.code()).subscribe({
      next: () => {
        this.snackBar.open('El Turno se elimino correctamente', 'OK', { duration: 3_000 })
        this.router.navigate(['../../'], { relativeTo: this.route })
      },
    })
  }
  onCleanUp() {
    if (this.isCreate()) {
      this.shiftAssignments.set({
        code: '',
        id: 0,
        turno_trabajo: '',
        usuario: '',
      })
      this.child()?.form.reset()
      return
    }

    this.editViewMode.set(EditViewModeEnum.VIEW_ONLY)
  }




}
