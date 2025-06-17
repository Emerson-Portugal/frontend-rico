import { Subscription } from 'rxjs'
import { Component, effect, inject, Input, input, model, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { RegexPatterns } from '@shared/constants'
import { CustomInputComponent,CustomSelectComponent } from '@shared/components'
import { EnumUtil, ValidatorUtil } from '@shared/utils'

import {ProfileTypeEnum } from '@features/maintenance/profile/constants';
import { ProfileService } from '@features/maintenance/profile/services';
import {CreateProfileDto, UpdateProfileDto} from '@features/maintenance/profile/models';

import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-profile-body',
  standalone: true,
  imports: [
    CustomInputComponent, 
    CustomSelectComponent, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profile-body.component.html',
  styles: ``
})
export class ProfileBodyComponent {

  private readonly fb = inject(FormBuilder)

  @Input() role!: string; // Recibe el valor de rol del padre
  
  ProfileTypeEnum = EnumUtil.toCustomSelectContent(ProfileTypeEnum);


  formSubscription: Subscription | null = null
  form = this.fb.group({
    username: ['', [Validators.required]],
    full_name: ['', [Validators.required]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]],


  })

  id = model<string>('')
  isCreate = model<boolean>(true)
  profiles = model.required<CreateProfileDto | UpdateProfileDto>()

  

  private updateFormValuesEffect = effect(() => {
    console.log("id", this.id())
      if (this.isCreate()) return

      const profile: UpdateProfileDto = this.profiles()
      if (!profile || ValidatorUtil.isObjectEmpty(profile as any)) return
      this.form.patchValue({
        username: String(profile.username),        
        full_name: String(profile.full_name),        
        role: String(this.role),
        //role: String(profile.role),
      })
      console.log('profile', profile)
      this.updateFormValuesEffect.destroy()
    })



  ngOnInit() {
    // Condición: si NO estamos en modo create, quitamos el validador
    if (!this.isCreate()) {
      this.form.get('password')?.clearValidators()
      this.form.get('password')?.updateValueAndValidity()
    }

    this.formSubscription = this.form.valueChanges.subscribe(() => {
      const updated: any = {
        username: this.form.get('username')?.value ?? '',
        full_name: this.form.get('full_name')?.value ?? '',
        role: this.form.get('role')?.value ?? '',
      }

      // Solo actualiza contraseña si estás creando
      if (this.isCreate()) {
        updated.password = this.form.get('password')?.value ?? ''
      }

      this.profiles.update(cur => ({ ...cur, ...updated }))
    })
  }


  ngOnDestroy() {
    this.formSubscription?.unsubscribe()
  }



}
