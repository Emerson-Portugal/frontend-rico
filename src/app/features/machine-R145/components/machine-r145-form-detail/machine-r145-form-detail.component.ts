import { map, Observable, Subscription } from 'rxjs'
import { AfterViewInit, Component, effect, inject, input, model, OnDestroy, OnInit, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { CustomInputComponent, CustomInputModalComponent, CustomSelectComponent, CustomTextareaComponent } from '@shared/components'
import { CreateMachineR145Dto, MachineR145Dto, UpdateMachineR145Dto } from '@features/machine-R145/models'
import { DateUtil, EnumUtil, ValidatorUtil } from '@shared/utils'
import { CustomDateInputComponent, CustomHourComponent  } from '@shared/components'

import { RegexPatterns, YesNoEnum } from '@shared/constants'


import { CommonModule } from '@angular/common'  // <-- Agregar importación de CommonModule
import { TokenService } from '@core/token/services/token.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  selector: 'app-machine-r145-form-detail',
  standalone: true,
  imports: [
    CustomInputComponent,
    ReactiveFormsModule,
    CustomSelectComponent,
    CustomHourComponent,
    CommonModule
  ],
  templateUrl: './machine-r145-form-detail.component.html',
  styles: ``
})
export class MachineR145FormDetailComponent {

  private readonly fb = inject(FormBuilder)




  formSubscription: Subscription | null = null
  sideEffectSubscriptions: Subscription[] = []

    form = this.fb.group({
    code: [{ value: '', disabled: true }],

    unidad_kilos: [0, [Validators.required, Validators.pattern(RegexPatterns.DECIMAL_NUMBER)]],
    hora_fin: ['', [Validators.required]],


    golpe : [0, [Validators.required, Validators.pattern(RegexPatterns.DECIMAL_NUMBER)]],
    recor : ['', [Validators.required]],

    peso : ['', [Validators.required]],
    vacio : ['', [Validators.required]],
    dm : ['', [Validators.required]],

    observaciones: ['', [Validators.required]],

  })
  code = model<string>('')
  isCreate = model<boolean>(true)
  machineR145Detail = model.required<CreateMachineR145Dto | UpdateMachineR145Dto>()
  machineR145DataDetail = input<MachineR145Dto | null>(null)

  valueStatusSelect = EnumUtil.toCustomSelectContent(YesNoEnum)

  //#region TOKEN

  userRole: string | null = null

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    // Obtener el rol del usuario desde el token
    this.userRole = this.tokenService.getRole()
  }
  //#endregion


  private updateFormValuesEffect = effect(() => {
    if (this.isCreate()) return

    const machineR145Detail: UpdateMachineR145Dto = this.machineR145Detail() as UpdateMachineR145Dto
    const machineR145DataDetail = this.machineR145DataDetail()
    if (!machineR145Detail || !machineR145DataDetail || ValidatorUtil.isObjectEmpty(machineR145Detail as any)) return


    this.form.patchValue({

      code: machineR145DataDetail.code,

      hora_fin: machineR145DataDetail.hora_fin,
      unidad_kilos: machineR145DataDetail.unidad_kilos,

      observaciones: machineR145DataDetail.observaciones,

      golpe: Number(machineR145DataDetail.golpe),
      recor: (machineR145DataDetail.recor),
      peso: machineR145DataDetail.peso,

      vacio: (machineR145DataDetail.vacio),
      dm: machineR145DataDetail.dm,


    })
    this.updateFormValuesEffect.destroy()
  })


  ngAfterViewInit(): void {
    this.formSubscription = this.form.valueChanges.subscribe(() => {
      this.machineR145Detail.update(cur => ({
        ...cur,

        hora_fin: this.form.get('hora_fin')?.value ?? '',
        unidad_kilos: this.form.get('unidad_kilos')?.value ?? 0,


        golpe: this.form.get('golpe')?.value ?? 0,
        recor: this.form.get('recor')?.value ?? '0',

        peso: this.form.get('peso')?.value ?? '',
        vacio: this.form.get('vacio')?.value ?? '',
        dm: this.form.get('dm')?.value ?? '',

        observaciones: this.form.get('observaciones')?.value ?? '',
      }))

    })

  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe()
    this.sideEffectSubscriptions.forEach(subscription => subscription.unsubscribe())
  }


}
