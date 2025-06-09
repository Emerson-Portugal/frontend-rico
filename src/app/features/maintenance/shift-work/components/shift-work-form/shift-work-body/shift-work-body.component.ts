import { Component, effect, inject, input, model, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreateShiftWorkDto, UpdateShiftWorkDto, ShiftWorkDto} from '@features/maintenance/shift-work/models';
import { RegexPatterns } from '@shared/constants';
import { DateUtil, EnumUtil, ValidatorUtil } from '@shared/utils';
import { Subscription } from 'rxjs';
import { CustomInputModalComponent, CustomDateInputComponent} from '@shared/components'


import { ShiftModalComponent } from '@features/maintenance/shifts/components'
import { ShiftDto } from '@features/maintenance/shifts/models'
import { ShiftService } from '@features/maintenance/shifts/services'



@Component({
  selector: 'app-shift-work-body',
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule, CustomInputModalComponent, CustomDateInputComponent ],
  templateUrl: './shift-work-body.component.html',
  styles: ``
})
export class ShiftWorkBodyComponent {

private readonly fb = inject(FormBuilder)
  code = model<string>('')
  isCreate = model<boolean>(true)
  shiftWorks = model.required<CreateShiftWorkDto | UpdateShiftWorkDto>()
  shiftWorksData = input<ShiftWorkDto | null>(null)
  private readonly shiftService = inject(ShiftService)
  shift = signal<ShiftDto | null>(null)
  ShiftModalComponent = ShiftModalComponent


  sideEffectSubscriptions: Subscription[] = []

  form = this.fb.group({
    code: [{ value: '', disabled: true }],
    turnoName: ['', [Validators.required]],
    turno: ['', [Validators.required]],
    fecha_inicio: [new Date(), [Validators.required]],
    fecha_fin: [new Date(), [Validators.required]],
  })
  formSubscription: Subscription | null = null

  private updateFormValuesEffect = effect(() => {
    if (this.isCreate()) return

    const shiftWorks: UpdateShiftWorkDto = this.shiftWorks() as UpdateShiftWorkDto
    const shiftWorksData = this.shiftWorksData()
    if (!shiftWorks || !shiftWorksData || ValidatorUtil.isObjectEmpty(shiftWorks as any)) return

    this.form.patchValue({
      code: this.code(),
      fecha_inicio: DateUtil.toDate(shiftWorks.fecha_inicio),
      fecha_fin: DateUtil.toDate(shiftWorks.fecha_fin),
    })
    this.updateFormValuesEffect.destroy()
  })
  private updateCodeStatusEffect = effect(() => {
    if (this.isCreate()) return

    this.form.get('code')!.disable()
    this.updateCodeStatusEffect.destroy()
  })
  ngOnInit() {
    this.formSubscription = this.form.valueChanges.subscribe(() => {
      if ('code' in this.shiftWorks()) {
        this.shiftWorks.update(cur => ({
          ...cur,
          fecha_inicio: DateUtil.toString(this.form.get('fecha_inicio')?.value),
          fecha_fin: DateUtil.toString(this.form.get('fecha_fin')?.value),
        }))
        return
      }

      this.shiftWorks.update(cur => ({
        ...cur,
          fecha_inicio: DateUtil.toString(this.form.get('fecha_inicio')?.value),
          fecha_fin: DateUtil.toString(this.form.get('fecha_fin')?.value),
      }))
    })
  }
  ngOnDestroy() {
    this.formSubscription?.unsubscribe()
    this.sideEffectSubscriptions.forEach(subscription => subscription.unsubscribe())

  }




  //#region Shift Modal
  private updateShiftEffect = effect(() => {
    if (this.isCreate()) return

    const shiftWorks = this.shiftWorks()
    if (!shiftWorks || !shiftWorks.turno) return

    this.getShiftByCode(shiftWorks.turno)
    this.updateShiftEffect.destroy()
  })

  getShiftByCode(code: string) {
    console.log('Fetching shift by code:', code)
    this.shiftService.getByCode(code).subscribe({
      next: ({ data }) => {
        this.shift.set(data)
        this.form.patchValue({ turnoName: data?.shift })
      },
    })
  }

  onShiftModalResult(shift: ShiftDto) {
    this.shift.set(shift)
    this.shiftWorks.update(cur => ({ ...cur, turno: shift?.code }))
    this.form.patchValue({  turnoName: shift?.shift })
  }
  //#endregion



}
