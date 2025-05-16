import { Component, effect, inject, model } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreateShiftDto, UpdateShiftDto } from '@features/maintenance/shifts/models';
import { CustomInputComponent,CustomSelectComponent, CustomHourComponent} from '@shared/components'
import { RegexPatterns } from '@shared/constants';
import { EnumUtil, ValidatorUtil } from '@shared/utils';
import { Subscription } from 'rxjs';


import { ShiftTypeEnum } from '@features/maintenance/shifts/constants';


@Component({
  selector: 'app-shift-form-body',
  standalone: true,
  imports: [CustomInputComponent, CustomSelectComponent, CustomHourComponent, ReactiveFormsModule, MatInputModule],
  templateUrl: './shift-form-body.component.html',
  styles: ``
})
export class ShiftFormBodyComponent {

 private readonly fb = inject(FormBuilder)
  code = model<string>('')
  
  isCreate = model<boolean>(true)
  shifts = model.required<CreateShiftDto | UpdateShiftDto>()
  form = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(RegexPatterns.ALPHA_NUMERIC)]],
    shift: ['', [Validators.required]],
    start_time: ['', [Validators.required]],
    end_time: ['', [Validators.required]],
  })

  ShiftTypeEnum = EnumUtil.toCustomSelectContent(ShiftTypeEnum);



  formSubscription: Subscription | null = null

  private updateFormValuesEffect = effect(() => {
    if (this.isCreate()) return

    const shifts: UpdateShiftDto = this.shifts()
    if (!shifts || ValidatorUtil.isObjectEmpty(shifts)) return

    this.form.patchValue({
      code: this.code(),
      shift: shifts.shift,
      start_time: String(shifts.start_time),
      end_time: String(shifts.end_time),
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
      if ('code' in this.shifts()!) {
        this.shifts.update(cur => ({
          ...cur,
          code: this.form.get('code')!.value ?? '',
          shift: this.form.get('shift')!.value ?? '',
          start_time: this.form.get('start_time')!.value ?? '',
          end_time: this.form.get('end_time')!.value ?? '',  
        }))
        return
      }

      this.shifts.update(cur => ({
        ...cur,
        shift: this.form.get('shift')!.value ?? '',
        start_time: this.form.get('start_time')!.value ?? '',
        end_time: this.form.get('end_time')!.value ?? '',
      }))
    })
  }
  ngOnDestroy() {
    this.formSubscription?.unsubscribe()
  }
}
