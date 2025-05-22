
import { MachineDto } from '@features/maintenance/machine/models'
import { ProductDto } from '@features/maintenance/product/models'
import { ShiftDto } from '@features/maintenance/shifts/models'

export interface MachineR145Dto {
    id: number; // 7
    code: string; // "KRYM"

    producto: ProductDto;
    maquina: MachineDto; // "49GK"
    turno: ShiftDto; // "54EF"


    fecha: string; // "2025-05-19"
    hora_inicio: string; // "08:00:00"
    hora_fin: string; // "12:00:00"
    unidad_kilos: number; // "50.00" → number

    estado: string; // "FINALIZADO"
    fase: string; // "FINALIZADO"

    
    
    lote_anio:string; // "2025" → number
    lote_sem: string; // "20" → number
    lote_dme: string; // "DM1234"

    extension_dia: string; // "15" → number
    extension_dmp: string; // "EXT001"
    extension_hora: string; // "08:30:00"
    vencimiento: string; // "2025-06-30"

    
    golpe: number; // true
    recor: string; // true
    
    peso: string; // "12.50" → number  
    vacio: string; // true
    dm: string; // false
    
    
    fecha_operario: string; // "2025-05-20T11:54:46.402275Z"
    fecha_revisador: string; // "2025-05-20T11:55:46.235414Z"
    fecha_auxiliar: string; // "2025-05-20T11:56:07.082429Z"
    
    
    operario: number; // 2
    revisador: number; // 1
    auxiliar: number; // 4


    observaciones: string; // "Todo correcto por AUXILIAR"
}