import { Component, effect, inject, input, model, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreateShiftAssignmentDto, ShiftAssignmentDto, UpdateShiftAssignmentDto} from '@features/maintenance/shift-assignments/models';
import { RegexPatterns } from '@shared/constants';
import { DateUtil, EnumUtil, ValidatorUtil } from '@shared/utils';
import { Subscription } from 'rxjs';
import { CustomInputModalComponent, CustomDateInputComponent} from '@shared/components'


import { ShiftWorkModalComponent } from '@features/maintenance/shift-work/components'
import { ShiftWorkDto } from '@features/maintenance/shift-work/models'
import { ShiftWorkService } from '@features/maintenance/shift-work/services'



import { ProfileModalComponent } from '@features/maintenance/profile/components'
import { ProfileDto } from '@features/maintenance/profile/models'
import { ProfileService } from '@features/maintenance/profile/services'

@Component({
  selector: 'app-shift-assignments-body',
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule, CustomInputModalComponent, CustomDateInputComponent],
  templateUrl: './shift-assignments-body.component.html',
  styles: ``
})
export class ShiftAssignmentsBodyComponent {



  private readonly fb = inject(FormBuilder)
  code = model<string>('')
  isCreate = model<boolean>(true)
  shiftAssignments = model.required<CreateShiftAssignmentDto | UpdateShiftAssignmentDto>()
  shiftAssignmentsData = input<ShiftAssignmentDto | null>(null)

  private readonly shiftWorkService = inject(ShiftWorkService)
  shiftWork = signal<ShiftWorkDto | null>(null)
  ShiftWorkModalComponent = ShiftWorkModalComponent
  
  private readonly profileService = inject(ProfileService)
  profile = signal<ProfileDto | null>(null)
  ProfileModalComponent = ProfileModalComponent


  sideEffectSubscriptions: Subscription[] = []

  form = this.fb.group({
    code: [{ value: '', disabled: true }],
    turnoTrabajoValue: ['', [Validators.required]],
    turnoTrabajoInicio: [new Date(), [Validators.required]],
    turnoTrabajoFin: [new Date(), [Validators.required]],
    usuarioValue: ['', [Validators.required]],
    usuario: ['', [Validators.required]],

  })
  formSubscription: Subscription | null = null

  private updateFormValuesEffect = effect(() => {
    if (this.isCreate()) return

    const shiftAssignments: UpdateShiftAssignmentDto = this.shiftAssignments() as UpdateShiftAssignmentDto
    const shiftAssignmentsData = this.shiftAssignmentsData()
    if (!shiftAssignments || !shiftAssignmentsData || ValidatorUtil.isObjectEmpty(shiftAssignments as any)) return

    this.form.patchValue({
      code: this.code(),
      turnoTrabajoInicio: DateUtil.toDate(shiftAssignmentsData.turno_trabajo.fecha_inicio),
      turnoTrabajoFin: DateUtil.toDate(shiftAssignmentsData.turno_trabajo.fecha_fin),
    })


    this.updateFormValuesEffect.destroy()
  })


  private updateCodeStatusEffect = effect(() => {
    if (this.isCreate()) return

    this.form.get('code')!.disable()
    this.updateCodeStatusEffect.destroy()
  })

  private updateAssestStatusEffect = effect(() => {


    this.form.get('turnoTrabajoInicio')?.disable()
    this.form.get('turnoTrabajoFin')?.disable()
    this.updateAssestStatusEffect.destroy()
  })


  ngOnInit() {
    this.formSubscription = this.form.valueChanges.subscribe(() => {


      this.shiftAssignments.update(cur => ({
        ...cur,

      }))

    })
  }
  ngOnDestroy() {
    this.formSubscription?.unsubscribe()
    this.sideEffectSubscriptions.forEach(subscription => subscription.unsubscribe())

  }




  //#region Shift Modal
  private updateShiftWorkEffect = effect(() => {
    if (this.isCreate()) return

    const shiftAssignments = this.shiftAssignments()
    if (!shiftAssignments || !shiftAssignments.turno_trabajo) return

    this.getShiftByCode(shiftAssignments.turno_trabajo)
    this.updateShiftWorkEffect.destroy()
  })

  getShiftByCode(code: string) {
    this.shiftWorkService.getByCode(code).subscribe({
      next: ({ data }) => {
        this.shiftWork.set(data)
        this.form.patchValue({ turnoTrabajoValue: data?.turno.code, turnoTrabajoInicio: DateUtil.toDate(data?.fecha_inicio), turnoTrabajoFin: DateUtil.toDate(data?.fecha_fin) })
      },
    })
  }

  onShiftWorkModalResult(shiftWork: ShiftWorkDto) {
    this.shiftWork.set(shiftWork)
    this.shiftAssignments.update(cur => ({ ...cur, turno_trabajo: shiftWork?.code }))
    this.form.patchValue({ turnoTrabajoValue: shiftWork?.turno.code, turnoTrabajoInicio: DateUtil.toDate(shiftWork?.fecha_inicio), turnoTrabajoFin: DateUtil.toDate(shiftWork?.fecha_fin) })
  }
  //#endregion


  //#region Profile Modal
  private updateProfileEffect = effect(() => {
    if (this.isCreate()) return

    const shiftAssignments = this.shiftAssignments()
    if (!shiftAssignments || !shiftAssignments.usuario) return

    this.getProfileByCode(shiftAssignments.usuario)
    this.updateProfileEffect.destroy()
  })

  getProfileByCode(code: string) {
    this.profileService.getByCode(code).subscribe({
      next: ({ data }) => {
        this.profile.set(data)
        this.form.patchValue({ usuarioValue: data?.username })
      },
    })
  }

  onProfileModalResult(profile: ProfileDto) {
    this.profile.set(profile)
    this.shiftAssignments.update(cur => ({ ...cur, usuario: profile?.id }))
    this.form.patchValue({ usuarioValue: profile?.username })
  }
  //#endregion



}
