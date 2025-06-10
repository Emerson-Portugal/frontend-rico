import { Component, computed, effect, inject, input, model, viewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CustomLayoutComponent } from '@shared/components'
import { EditViewModeEnum } from '@shared/constants'

import { ProfileBodyComponent } from './profile-body/profile-body.component'
import { ProfileHeaderComponent } from './profile-header/profile-header.component'
import { ProfileService } from '../../services'
import { CreateProfileDto, UpdateProfileDto } from '../../models'
import { da } from 'date-fns/locale'

const NEW_ACCOUNT = {
  username: '',
  password : '',
  role: '',

}


@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CustomLayoutComponent, ProfileHeaderComponent, ProfileBodyComponent],
  templateUrl: './profile-form.component.html',
  styles: ``
})
export class ProfileFormComponent {


  private readonly profileService = inject(ProfileService)
  private readonly snackBar = inject(MatSnackBar)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)

  code = input<string>('')
  profiles = model<CreateProfileDto | UpdateProfileDto>(NEW_ACCOUNT)

  showToolbar = input<boolean>(true)
  showBreadcrumbs = input<boolean>(true)
  showActionButtons = input<boolean>(true)
  showHeader = model<boolean>(true)
  editViewMode = model<EditViewModeEnum>(EditViewModeEnum.VIEW_ONLY)
  isCreate = computed(() => !this.code())
  canEdit = computed(() => this.editViewMode() !== EditViewModeEnum.VIEW_ONLY)
  child = viewChild(ProfileBodyComponent)

  private fetchCityEffect = effect(() => {
    if (!this.code()) return

    this.getByCode()
    this.fetchCityEffect.destroy()
  })


  get role(): string {
    const acc = this.profiles();
    return 'role' in acc ? (acc as CreateProfileDto).role || '' : '';
  }
  
  


  getByCode() {
    this.profileService.getByCode(this.code()).subscribe({
      next: ({ data }) => {
        this.profiles.set({
          username: data.username,
          role: data.role,


        })


      },
    })
  }

  onSaveElement() {
    const profiles = this.profiles();

    if (!profiles) return

    if (this.isCreate()) {
      this.profileService.create(profiles as CreateProfileDto).subscribe({
        next: () => {
          this.snackBar.open('Se creo correctamente', 'OK', { duration: 3_000 })
          this.onCleanUp()
        },
      })
      return
    } else {
      const profilesForUpdate = {
        username: profiles.username,
        role: profiles.role,
      }

      this.profileService.update(this.code(), profilesForUpdate).subscribe({
        next: () => {
          this.snackBar.open('Se actualizo correctamente', 'OK', { duration: 3_000 })
          this.onCleanUp()
        },
      })
    }
  }

  onDeleteElement() {
    this.profileService.delete(this.code()).subscribe({
      next: () => {
        this.snackBar.open('Se elimino correctamente', 'OK', { duration: 3_000 })
        this.router.navigate(['../../'], { relativeTo: this.route })
      },
    })
  }

  onCleanUp() {
    if (this.isCreate()) {
      this.profiles.set(NEW_ACCOUNT)
      this.child()?.form.reset()
      return
    }

    this.editViewMode.set(EditViewModeEnum.VIEW_ONLY)
  }




}
