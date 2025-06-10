import { Component, inject, signal } from '@angular/core'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { ShiftAssignmentsService } from '../../services'
import { CustomBehaviourEnum, EditViewModeEnum, ModalViewMode } from '@shared/constants'
import { ShiftAssignmentDto} from '../../models'
import { ShiftAssignmentsListComponent } from '../shift-assignments-list/shift-assignments-list.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-shift-assignments-modal',
  standalone: true,
  imports: [ShiftAssignmentsListComponent, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './shift-assignments-modal.component.html',
  styles: ``
})
export class ShiftAssignmentsModalComponent {
  public dialogRef = inject(MatDialogRef<this>)
  private readonly shiftAssignmentsService = inject(ShiftAssignmentsService)

  title = 'Tipo de Turno'
  EditViewModeEnum = EditViewModeEnum
  CustomBehaviourEnum = CustomBehaviourEnum
  viewMode = signal<ModalViewMode>('list')

  onSelectElement(shiftAssignment: ShiftAssignmentDto) {
    this.dialogRef.close(shiftAssignment)
  }

  getShiftAssignmentByCode(code: string) {
    this.shiftAssignmentsService.getByCode(code).subscribe({
      next: ({ data }) => this.dialogRef.close(data),
    })
  }

  toggleViewMode() {
    this.viewMode.set('list')
  }
}
