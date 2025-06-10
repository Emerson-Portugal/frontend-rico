import { Component } from '@angular/core'
import { CreateShiftAssignmentDto } from '../../models'
import { EditViewModeEnum } from '@shared/constants'
import { ShiftAssignmentsFormComponent } from '../../components'

@Component({
  selector: 'app-create-shift-assignments',
  standalone: true,
  imports: [ShiftAssignmentsFormComponent],
  templateUrl: './create-shift-assignments.component.html',
  styles: ``
})
export class CreateShiftAssignmentsComponent {
  editViewMode = EditViewModeEnum.CREATE
  shiftAssignments: CreateShiftAssignmentDto = {
    code: '',
    id: 0,
    turno_trabajo: '',
    usuario: '',
  }
}
