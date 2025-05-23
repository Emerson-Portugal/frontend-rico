import { Subscription } from 'rxjs'
import { AfterViewInit, Component, effect, inject, input, model, OnDestroy, OnInit, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { CustomInputComponent, CustomInputModalComponent, CustomSelectComponent, CustomTextareaComponent } from '@shared/components'
import { CreateMachineR145Dto, MachineR145Dto, UpdateMachineR145Dto } from '@features/machine-R145/models'
import { DateUtil, EnumUtil, ValidatorUtil } from '@shared/utils'
import { CustomDateInputComponent, CustomHourComponent  } from '@shared/components'

import { RegexPatterns, YesNoEnum } from '@shared/constants'

import { ShiftModalComponent } from '@features/maintenance/shifts/components'
import { ShiftDto } from '@features/maintenance/shifts/models'
import { ShiftService } from '@features/maintenance/shifts/services'


import { ProductModalComponent } from '@features/maintenance/product/components'
import { ProductDto } from '@features/maintenance/product/models'
import { ProductService } from '@features/maintenance/product/services'



import { MachineModalComponent } from '@features/maintenance/machine/components'
import { MachineDto } from '@features/maintenance/machine/models'
import { MachineService } from '@features/maintenance/machine/services'


import { CommonModule } from '@angular/common'  // <-- Agregar importación de CommonModule
import { TokenService } from '@core/token/services/token.service'


@Component({
  selector: 'app-machine-r145-form-body',
  standalone: true,
  imports: [
    CustomInputModalComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    CustomSelectComponent,
    CustomDateInputComponent,
    CustomTextareaComponent,
    CustomHourComponent,
    CommonModule
  ],
  templateUrl: './machine-r145-form-body.component.html',
  styles: ``
})
export class MachineR145FormBodyComponent implements AfterViewInit, OnDestroy {
  private readonly fb = inject(FormBuilder)

  private readonly shiftService = inject(ShiftService)
  private readonly productService = inject(ProductService)
  private readonly machineService = inject(MachineService)

  formSubscription: Subscription | null = null
  sideEffectSubscriptions: Subscription[] = []

  form = this.fb.group({
    code: [{ value: '', disabled: true }],

    fecha: [new Date(), [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    unidad_kilos: [0, [Validators.required, Validators.pattern(RegexPatterns.DECIMAL_NUMBER)]],

    productoName: ['', [Validators.required]],
    producto: ['', [Validators.required]],
    maquinaName: ['', [Validators.required]],
    turnoName: ['', [Validators.required]],

    lote_anio: ['', [Validators.required]],
    lote_sem: ['', [Validators.required]],
    lote_dme: ['', [Validators.required]],

    extension_dia: ['', [Validators.required]],
    extension_dmp: ['', [Validators.required]],
    extension_hora: ['', [Validators.required]],
    vencimiento: [new Date(), [Validators.required]],

    golpe : [0, [Validators.required, Validators.pattern(RegexPatterns.DECIMAL_NUMBER)]],
    recor : ['', [Validators.required]],

    peso : ['NO', [Validators.required]],
    vacio : ['NO', [Validators.required]],
    dm : ['NO', [Validators.required]],

    observaciones: ['', [Validators.required]],

  })
  code = model<string>('')
  isCreate = model<boolean>(true)
  machineR145 = model.required<CreateMachineR145Dto | UpdateMachineR145Dto>()
  machineR145Data = input<MachineR145Dto | null>(null)
  shift = signal<ShiftDto | null>(null)
  product = signal<ProductDto | null>(null)
  machine = signal<MachineDto | null>(null)


  ShiftModalComponent = ShiftModalComponent
  ProductModalComponent = ProductModalComponent
  MachineModalComponent = MachineModalComponent

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

    const machineR145: UpdateMachineR145Dto = this.machineR145() as UpdateMachineR145Dto
    const machineR145Data = this.machineR145Data()
    if (!machineR145 || !machineR145Data || ValidatorUtil.isObjectEmpty(machineR145 as any)) return


    this.form.patchValue({

      code: machineR145Data.code,


      fecha: DateUtil.toDate(machineR145Data.fecha),
      hora_inicio: machineR145Data.hora_inicio,
      hora_fin: machineR145Data.hora_fin,
      unidad_kilos: Number(machineR145Data.unidad_kilos),


      observaciones: machineR145Data.observaciones,

      lote_anio: (machineR145Data.lote_anio),
      lote_sem: (machineR145Data.lote_sem),
      lote_dme: machineR145Data.lote_dme,
      extension_dia: (machineR145Data.extension_dia),
      extension_dmp: machineR145Data.extension_dmp,
      extension_hora: machineR145Data.extension_hora,
      vencimiento: DateUtil.toDate(machineR145Data.vencimiento),
      peso: (machineR145Data.peso),

      golpe: machineR145Data.golpe,
      recor: machineR145Data.recor,
      vacio: machineR145Data.vacio,
      dm: machineR145Data.dm,



    })
    this.updateFormValuesEffect.destroy()
  })


  ngAfterViewInit(): void {
    this.formSubscription = this.form.valueChanges.subscribe(() => {
      this.machineR145.update(cur => ({
        ...cur,


        fecha:  DateUtil.toString(this.form.get('fecha')?.value),
        hora_inicio: this.form.get('hora_inicio')?.value ?? '',
        hora_fin: this.form.get('hora_fin')?.value ?? '',
        unidad_kilos: this.form.get('unidad_kilos')?.value ?? 0,



        lote_anio: this.form.get('lote_anio')?.value ?? '',
        lote_sem: this.form.get('lote_sem')?.value ?? '',
        lote_dme: this.form.get('lote_dme')?.value ?? '',

        extension_dia: this.form.get('extension_dia')?.value ?? '',
        extension_dmp: this.form.get('extension_dmp')?.value ?? '',
        extension_hora: this.form.get('extension_hora')?.value ?? '',
        vencimiento:  DateUtil.toString(this.form.get('vencimiento')?.value),

        golpe: this.form.get('golpe')?.value ?? 0,
        recor: this.form.get('recor')?.value ?? '',

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




  //#region Shift Modal
  private updateShiftEffect = effect(() => {
    if (this.isCreate()) return

    const machineR145 = this.machineR145()
    if (!machineR145 || !machineR145.turno) return

    this.getShiftByCode(machineR145.turno)
    this.updateShiftEffect.destroy()
  })

  getShiftByCode(code: string) {
    this.shiftService.getByCode(code).subscribe({
      next: ({ data }) => {
        this.shift.set(data)
        this.form.patchValue({ turnoName: data?.shift })
      },
    })
  }

  onShiftModalResult(shift: ShiftDto) {
    this.shift.set(shift)
    this.machineR145.update(cur => ({ ...cur, turno: shift?.code }))
    this.form.patchValue({  turnoName: shift?.shift })
  }
  //#endregion




  //#region Product Modal
  private updateProductEffect = effect(() => {
    if (this.isCreate()) return

    const machineR145 = this.machineR145()
    if (!machineR145 || !machineR145.producto) return

    this.getProductByCode(machineR145.producto)
    this.updateProductEffect.destroy()
  })

  getProductByCode(code: string) {
    this.productService.getByCode(code).subscribe({
      next: ({ data }) => {
        this.form.patchValue({ productoName: data?.name })
      },
    })
  }

  onProductModalResult(product: ProductDto) {
    this.product.set(product)
    this.machineR145.update(cur => ({ ...cur, producto: product?.code }))
    this.form.patchValue({  productoName: product?.name })
  }
  //#endregion


  //#region Machine Modal
  private updateMachineEffect = effect(() => {
    if (this.isCreate()) return

    const machineR145 = this.machineR145()
    if (!machineR145 || !machineR145.maquina) return

    this.getMachineByCode(machineR145.maquina)
    this.updateMachineEffect.destroy()
  })

  getMachineByCode(code: string) {
    this.machineService.getByCode(code).subscribe({
      next: ({ data }) => {
        this.machine.set(data)
        this.form.patchValue({ maquinaName: data?.name })
      },
    })
  }

  onMachineModalResult(machine: MachineDto) {
    this.machine.set(machine)
    this.machineR145.update(cur => ({ ...cur, maquina: machine?.code }))
    //this.form.patchValue({ maquina: "49GK", maquinaName: "R145" })
    this.form.patchValue({ maquinaName: machine?.name })
  }
  //#endregion


}
