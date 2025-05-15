import { Component } from '@angular/core'
import { CreateMachineDto } from '../../models'
import { EditViewModeEnum } from '@shared/constants'
import { MachineFormComponent } from '../../components'

@Component({
  selector: 'app-create-machine-page',
  standalone: true,
  imports: [MachineFormComponent],
  templateUrl: './create-machine-page.component.html',
  styles: ``
})
export class CreateMachinePageComponent {
  editViewMode = EditViewModeEnum.CREATE
  machine: CreateMachineDto = {
    //code: '',
    name: '',
  }
}
