import { Component, effect, inject, model } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreateMachineDto, UpdateMachineDto } from '@features/maintenance/machine/models';
import { CustomInputComponent } from '@shared/components';
import { RegexPatterns } from '@shared/constants';
import { ValidatorUtil } from '@shared/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-machine-form-body',
  standalone: true,
  imports: [CustomInputComponent, ReactiveFormsModule, MatInputModule],
  templateUrl: './machine-form-body.component.html',
  styles: ``
})
export class MachineFormBodyComponent {

 private readonly fb = inject(FormBuilder)
  code = model<string>('')
  isCreate = model<boolean>(true)
  machine = model.required<CreateMachineDto | UpdateMachineDto>()
  form = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(RegexPatterns.ALPHA_NUMERIC)]],
    name: ['', [Validators.required, Validators.pattern(RegexPatterns.TEXT_ONLY)]],
  })
  formSubscription: Subscription | null = null

  private updateFormValuesEffect = effect(() => {
    if (this.isCreate()) return

    const machine: UpdateMachineDto = this.machine()
    if (!machine || ValidatorUtil.isObjectEmpty(machine)) return

    this.form.patchValue({
      code: this.code(),
      name: machine.name,
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
      if ('code' in this.machine()!) {
        this.machine.update(cur => ({
          ...cur,
          code: this.form.get('code')!.value ?? '',
          name: this.form.get('name')!.value ?? '',
        }))
        return
      }

      this.machine.update(cur => ({
        ...cur,
        name: this.form.get('name')!.value ?? '',
      }))
    })
  }
  ngOnDestroy() {
    this.formSubscription?.unsubscribe()
  }
}
