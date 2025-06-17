import { Component } from '@angular/core'
import { CreateProfileDto } from '../../models'
import { EditViewModeEnum } from '@shared/constants'
import { ProfileFormComponent } from '../../components'

@Component({
  selector: 'app-create-profile-page',
  standalone: true,
  imports: [ProfileFormComponent],
  templateUrl: './create-profile-page.component.html',
  styles: ``
})
export class CreateProfilePageComponent {
  editViewMode = EditViewModeEnum.CREATE
  profiles: CreateProfileDto = {
    username: '',
    full_name: '',
    password: '',
    role: '',
  }
}
