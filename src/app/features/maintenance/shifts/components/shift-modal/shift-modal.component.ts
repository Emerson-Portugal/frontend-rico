import { Component, inject, signal } from '@angular/core'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { ShiftService } from '../../services'
import { CustomBehaviourEnum, EditViewModeEnum, ModalViewMode } from '@shared/constants'
import { ShiftDto} from '../../models'
import { ShiftListComponent } from '../shift-list/shift-list.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'


@Component({
  selector: 'app-shift-modal',
  standalone: true,
  imports: [ShiftListComponent, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './shift-modal.component.html',
  styles: ``
})
export class ShiftModalComponent {
  public dialogRef = inject(MatDialogRef<this>)
  private readonly shiftService = inject(ShiftService)

  title = 'Tipo de Turno'
  EditViewModeEnum = EditViewModeEnum
  CustomBehaviourEnum = CustomBehaviourEnum
  viewMode = signal<ModalViewMode>('list')

  onSelectElement(shift: ShiftDto) {
    this.dialogRef.close(shift)
  }

  getShiftByCode(code: string) {
    this.shiftService.getByCode(code).subscribe({
      next: ({ data }) => this.dialogRef.close(data),
    })
  }

  toggleViewMode() {
    this.viewMode.set('list')
  }
}
