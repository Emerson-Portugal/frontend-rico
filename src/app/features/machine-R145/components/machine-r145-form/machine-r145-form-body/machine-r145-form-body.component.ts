import { combineLatest, map, Observable, of, Subscription, switchMap, tap } from 'rxjs'
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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { MachineR145TypeEnum } from '@features/machine-R145/constants/machine-r145-type.enum'


// llamado a usuario
import { ProfileService } from '@features/maintenance/profile/services'
import { ProfileDto } from '@features/maintenance/profile/models'
import { ShiftAssignmentsService } from '@features/maintenance/shift-assignments/services'


import { addDays, format, getISOWeek, startOfWeek } from 'date-fns';
import constants from 'constants'

@Component({
  selector: 'app-machine-r145-form-body',
  standalone: true,
  imports: [
    CustomInputModalComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    CustomDateInputComponent,
    CustomTextareaComponent,
    CustomHourComponent,
    CommonModule,
    CustomSelectComponent
  ],
  templateUrl: './machine-r145-form-body.component.html',
  styles: ``
})
export class MachineR145FormBodyComponent {
  private readonly fb = inject(FormBuilder)


  private readonly productService = inject(ProductService)
  private readonly profileService = inject(ProfileService)
  private readonly shiftAssignmentsService = inject(ShiftAssignmentsService)

  formSubscription: Subscription | null = null
  sideEffectSubscriptions: Subscription[] = []

  form = this.fb.group({
    code: [{ value: '', disabled: true }],

    fecha: [new Date(), [Validators.required]],
    hora_inicio: ['', [Validators.required]],

    turno: ['', [Validators.required]],
    turnoName: ['', [Validators.required]],

    productoName: ['', [Validators.required]],
    producto: ['', [Validators.required]],
    maquina: ['', [Validators.required]],

    lote_anio: ['', [Validators.required]],
    lote_sem: ['', [Validators.required]],
    lote_dme: ['', [Validators.required]],

    extension_dia: ['', [Validators.required]],
    extension_dmp: ['', [Validators.required]],
    extension_hora: ['', [Validators.required]],
    vencimiento: [new Date(), [Validators.required]],



    observaciones: ['', [Validators.required]],

  })

  profile = ''

  code = model<string>('')
  isCreate = model<boolean>(true)
  machineR145 = model.required<CreateMachineR145Dto | UpdateMachineR145Dto>()
  machineR145Data = input<MachineR145Dto | null>(null)

  product = signal<ProductDto | null>(null)

  tipo: string = '' // valor inicial, puede cambiar dinámicamente


  ProductModalComponent = ProductModalComponent


  machineR145TypeEnum = EnumUtil.toCustomSelectContent(MachineR145TypeEnum)




  private updateFormValuesEffect = effect(() => {
    if (this.isCreate()) return

    const machineR145: UpdateMachineR145Dto = this.machineR145() as UpdateMachineR145Dto
    const machineR145Data = this.machineR145Data()
    if (!machineR145 || !machineR145Data || ValidatorUtil.isObjectEmpty(machineR145 as any)) return


    this.form.patchValue({

      code: machineR145Data.code,

      fecha: DateUtil.toDate(machineR145Data.fecha),
      hora_inicio: machineR145Data.hora_inicio,

      maquina: machineR145Data.maquina,
      observaciones: machineR145Data.observaciones,

      lote_anio: (machineR145Data.lote_anio),
      lote_sem: (machineR145Data.lote_sem),
      lote_dme: machineR145Data.lote_dme,

      extension_dia: (machineR145Data.extension_dia),
      extension_dmp: machineR145Data.extension_dmp,
      extension_hora: machineR145Data.extension_hora,

      vencimiento: DateUtil.toDate(machineR145Data.vencimiento),


    })
    this.updateFormValuesEffect.destroy()
  })


  ngOnInit(): void {

    this.getProfileAndShiftAssignment()
    this.gethora()



    this.formSubscription = this.form.valueChanges.subscribe(() => {
      this.machineR145.update(cur => ({
        ...cur,


        fecha:  DateUtil.toString(this.form.get('fecha')?.value),
        hora_inicio: this.form.get('hora_inicio')?.value ?? '',

        maquina: this.form.get('maquina')?.value ?? '',

        lote_anio: this.form.get('lote_anio')?.value ?? '',
        lote_sem: this.form.get('lote_sem')?.value ?? '',
        lote_dme: this.form.get('lote_dme')?.value ?? '',

        extension_dia: this.form.get('extension_dia')?.value ?? '',
        extension_dmp: this.form.get('extension_dmp')?.value ?? '',
        extension_hora: this.form.get('extension_hora')?.value ?? '',

        vencimiento:  DateUtil.toString(this.form.get('vencimiento')?.value),

        observaciones: this.form.get('observaciones')?.value ?? '',



        
      }))

    })

  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe()
    this.sideEffectSubscriptions.forEach(subscription => subscription.unsubscribe())
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
    this.product.set(product);
    this.machineR145.update(cur => ({ ...cur, producto: product?.code }));
    this.tipo = product?.type;
    this.form.patchValue({ productoName: product?.name });

    const now = new Date();

    if (product?.type === 'COCIDO') {
      const anio = now.getFullYear();
      const semana = getISOWeek(now);

      // Base para el cálculo: lunes como inicio de semana
      const diaSemana = now.getDay(); // 0 (domingo) - 6 (sábado)
      const lunes = startOfWeek(now, { weekStartsOn: 1 }); // lunes
      const jueves = addDays(lunes, 3); // jueves

      const baseDate =
        diaSemana >= 1 && diaSemana <= 3
          ? lunes
          : diaSemana >= 4 && diaSemana <= 6
          ? jueves
          : now; // domingo: usar hoy como fallback

      const dia = String(baseDate.getDate()).padStart(2, '0');
      const mes = String(baseDate.getMonth() + 1).padStart(2, '0'); // mes 1-indexado
      const lote_dme = `${dia}-${mes}`;

      this.form.patchValue({
        lote_anio: anio.toString(),
        lote_sem: semana.toString(),
        lote_dme: lote_dme,
      });
    }

    else if (product?.type === 'CRUDO') {
      const anio = now.getFullYear();
      const mes = now.getMonth() + 1; // 0-indexed
      const dia = now.getDate();
      this.form.patchValue({
        lote_anio: anio.toString(),
        lote_sem: mes.toString(),
        lote_dme: dia.toString(),
      });
    }


    // === EXTENSION ===

    // Día de la semana en formato 1 (lunes) a 7 (domingo)
    const extension_dia = now.getDay() === 0 ? 7 : now.getDay();

    // Hora actual en formato HH:mm
    const extension_hora = format(now, 'HH:mm');


    this.form.patchValue({
      extension_dia: extension_dia.toString(),
      extension_hora: extension_hora,
      // extension_dmp se deja manual
    });


    // === Fecha Vencimiento ===



    const fechaActual = this.form.get('fecha')?.value ?? new Date();
    const fechaVencimiento = addDays(new Date(fechaActual), product?.day ?? 0);

    this.form.patchValue({
      vencimiento: fechaVencimiento
    });





  }
  //#endregion



// hora


  gethora() {
    const now = new Date();
    const hora_inicio = format(now, 'HH:mm');

    this.form.patchValue({
      hora_inicio: hora_inicio,
      // extension_dmp se deja manual
    });
  }





  //#region Perfil Modal
  getProfileAndShiftAssignment() {
    this.profileService.getByProfile().subscribe({
      next: ({ data }) => {
        const username = data?.username
        this.profile = username
        console.log('valor', this.profile)

        if (username) {
          this.getShiftAssignmentsCode(username)
        }
      },
      error: (err) => {
        console.error('Error al obtener el perfil', err)
      }
    })
  }
  //#endregion









//#region Turno asignado Modal

  getShiftAssignmentsCode(name: string) {
    this.shiftAssignmentsService.getByName(name).subscribe({
      next: ({ data }) => {
        console.log('Shift Assignment Data:', data)

        const assignment = Array.isArray(data) ? data.find(() => true) : null

        if (assignment) {
          console.log('Código de asignación:', assignment.code)
          this.form.patchValue({ turnoName: assignment.code })
          this.machineR145.update(cur => ({ ...cur, turno: assignment.code }))
        } else {
          console.warn('No se encontró asignación de turno para:', name)
        }
      },
      error: () => {
        console.error('Error al obtener las asignaciones de turno')
      }
    })
  }



//#endregion










}
