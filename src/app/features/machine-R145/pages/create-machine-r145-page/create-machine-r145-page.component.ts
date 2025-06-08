import { Component } from '@angular/core'
import { MachineR145FormComponent } from '../../components/machine-r145-form/machine-r145-form.component'
import { CreateMachineR145Dto } from '../../models'
import { EditViewModeEnum, YesNoEnum } from '@shared/constants'

@Component({
  selector: 'app-create-machine-r145-page',
  standalone: true,
  imports: [MachineR145FormComponent],
  templateUrl: './create-machine-r145-page.component.html',
  styles: ``
})
export class CreateMachineR145PageComponent {
  editViewMode = EditViewModeEnum.CREATE
  machineR145: CreateMachineR145Dto = {
    producto: '',
    maquina: '',
    turno: '',
    fecha: '',
    hora_inicio: '',
    hora_fin: '00:00',
    unidad_kilos: 0, // para que no sea obligatorio

    lote_anio: '', // puede quedarse vacío
    lote_sem: '',
    lote_dme: '',

    extension_dia: '',
    extension_dmp: '',
    extension_hora: '',
    vencimiento: '',

    golpe: 0, // para que no sea obligatorio
    recor: '',

    peso: '', // o null si no se usa enum obligatorio
    vacio: '',
    dm: '',

    observaciones: ''
  }


}
