import { Component } from '@angular/core'
import { CreateShiftDto } from '../../models'
import { EditViewModeEnum } from '@shared/constants'
import { ShiftFormComponent } from '../../components'


@Component({
  selector: 'app-create-shift-page',
  standalone: true,
  imports: [ShiftFormComponent],
  templateUrl: './create-shift-page.component.html',
  styles: ``
})
export class CreateShiftPageComponent {
  editViewMode = EditViewModeEnum.CREATE
  shifts: CreateShiftDto = {
    shift: '',
    start_time: '',
    end_time: '',
  }
}
