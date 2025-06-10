import { Component, inject, signal } from '@angular/core'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { ProfileService } from '../../services'
import { CustomBehaviourEnum, EditViewModeEnum, ModalViewMode } from '@shared/constants'
import { ProfileDto} from '../../models'
import { ProfileListComponent } from '../profile-list/profile-list.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [ProfileListComponent, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './profile-modal.component.html',
  styles: ``
})
export class ProfileModalComponent {
  public dialogRef = inject(MatDialogRef<this>)
  private readonly profileService = inject(ProfileService)

  title = 'Tipo de Perfil'
  EditViewModeEnum = EditViewModeEnum
  CustomBehaviourEnum = CustomBehaviourEnum
  viewMode = signal<ModalViewMode>('list')

  onSelectElement(profile: ProfileDto) {
    this.dialogRef.close(profile)
  }

  getProfileByCode(code: string) {
    this.profileService.getByCode(code).subscribe({
      next: ({ data }) => this.dialogRef.close(data),
    })
  }

  toggleViewMode() {
    this.viewMode.set('list')
  }
}
