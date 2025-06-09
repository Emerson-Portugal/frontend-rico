import { Component, inject, signal } from '@angular/core'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { ShiftWorkService } from '../../services'
import { CustomBehaviourEnum, EditViewModeEnum, ModalViewMode } from '@shared/constants'
import { ShiftWorkDto} from '../../models'
import { ShiftWorkListComponent } from '../shift-work-list/shift-work-list.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-shift-work-modal',
  standalone: true,
  imports: [ShiftWorkListComponent, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './shift-work-modal.component.html',
  styles: ``
})
export class ShiftWorkModalComponent {
  public dialogRef = inject(MatDialogRef<this>)
  private readonly shiftWorkService = inject(ShiftWorkService)

  title = 'Tipo de Turno'
  EditViewModeEnum = EditViewModeEnum
  CustomBehaviourEnum = CustomBehaviourEnum
  viewMode = signal<ModalViewMode>('list')

  onSelectElement(shiftWork: ShiftWorkDto) {
    this.dialogRef.close(shiftWork)
  }

  getShiftWorkByCode(code: string) {
    this.shiftWorkService.getByCode(code).subscribe({
      next: ({ data }) => this.dialogRef.close(data),
    })
  }

  toggleViewMode() {
    this.viewMode.set('list')
  }
}
