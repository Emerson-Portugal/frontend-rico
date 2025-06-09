import { Component } from '@angular/core'
import { CreateShiftWorkDto } from '../../models'
import { EditViewModeEnum } from '@shared/constants'
import { ShiftWorkFormComponent } from '../../components'

@Component({
  selector: 'app-create-shift-work-page',
  standalone: true,
  imports: [ShiftWorkFormComponent],
  templateUrl: './create-shift-work-page.component.html',
  styles: ``
})
export class CreateShiftWorkPageComponent {
  editViewMode = EditViewModeEnum.CREATE
  shiftWorks: CreateShiftWorkDto = {
    code: '',
    turno: '',
    fecha_inicio: '',
    fecha_fin: '',
  }
}
