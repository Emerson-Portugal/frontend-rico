import { Component, computed, effect, inject, input, model, viewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { ShiftWorkService } from '../../services'
import { CreateShiftWorkDto, UpdateShiftWorkDto } from '../../models'
import { EditViewModeEnum } from '@shared/constants'
import { ShiftWorkHeaderComponent } from './shift-work-header/shift-work-header.component'
import { ShiftWorkBodyComponent } from './shift-work-body/shift-work-body.component'
import { CustomLayoutComponent } from '@shared/components'


@Component({
  selector: 'app-shift-work-form',
  standalone: true,
  imports: [ShiftWorkHeaderComponent, ShiftWorkBodyComponent, CustomLayoutComponent],
  templateUrl: './shift-work-form.component.html',
  styles: ``
})
export class ShiftWorkFormComponent {


  private readonly shiftWorkService = inject(ShiftWorkService)
  private readonly snackBar = inject(MatSnackBar)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  code = input<string>('')
  shiftWorks = model<CreateShiftWorkDto | UpdateShiftWorkDto>({
    code: this.code() ,
    turno: '',
    fecha_inicio: '',
    fecha_fin: '',
  })

  showToolbar = input<boolean>(true)
  showBreadcrumbs = input<boolean>(true)
  showActionButtons = input<boolean>(true)
  showHeader = model<boolean>(true)
  editViewMode = model<EditViewModeEnum>(EditViewModeEnum.VIEW_ONLY)
  isCreate = computed(() => !this.code())
  canEdit = computed(() => this.editViewMode() !== EditViewModeEnum.VIEW_ONLY)
  child = viewChild(ShiftWorkBodyComponent)
  private fetchShiftWorkEffect = effect(() => {
    if (!this.code()) return

    this.getByCode()
    this.fetchShiftWorkEffect.destroy()
  })
  getByCode() {
    this.shiftWorkService.getByCode(this.code()).subscribe({
      next: ({ data }) => {
        this.shiftWorks.set({
          code: data.code,
          fecha_fin: data.fecha_fin,
          fecha_inicio: data.fecha_inicio,  
          turno: String(data.turno.code),
        })

      },

      

      
    })
  }
  onSaveElement() {
    const shiftWork = this.shiftWorks()
    if (!shiftWork) return

    if (this.isCreate()) {
      this.shiftWorkService.create(shiftWork).subscribe({
        next: () => {
          this.snackBar.open('El Turno se creo correctamente', 'OK', { duration: 3_000 })
          this.onCleanUp()
        },
      })
      return
    }
    this.shiftWorkService.update(this.code(), shiftWork).subscribe({
      next: () => {
        this.snackBar.open('El Turno se actualizo correctamente', 'OK', { duration: 3_000 })
        this.onCleanUp()
      },
    })
  }
  onDeleteElement() {
    this.shiftWorkService.delete(this.code()).subscribe({
      next: () => {
        this.snackBar.open('El Turno se elimino correctamente', 'OK', { duration: 3_000 })
        this.router.navigate(['../../'], { relativeTo: this.route })
      },
    })
  }
  onCleanUp() {
    if (this.isCreate()) {
      this.shiftWorks.set({
        code: '',
        fecha_inicio: '',
        fecha_fin: '',
        turno: '',
      })
      this.child()?.form.reset()
      return
    }

    this.editViewMode.set(EditViewModeEnum.VIEW_ONLY)
  }




}
