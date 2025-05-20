
export interface MachineR145Dto {
    id: number; // 7

    producto: number; // "6133" → string numérica → number
    maquina: string; // "49GK"
    turno: string; // "54EF"


    fecha: string; // "2025-05-19"
    hora_inicio: string; // "08:00:00"
    hora_fin: string; // "12:00:00"
    unidad_kilos: number; // "50.00" → number

    estado: string; // "FINALIZADO"
    fase: string; // "FINALIZADO"

    observaciones: string; // "Todo correcto por AUXILIAR"

    code: string; // "KRYM"

    lote_anio: number; // "2025" → number
    lote_sem: number; // "20" → number
    lote_dme: string; // "DM1234"
    extension_dia: number; // "15" → number
    extension_dmp: string; // "EXT001"
    extension_hora: string; // "08:30:00"
    vencimiento: string; // "2025-06-30"
    peso: number; // "12.50" → number


    golpe: boolean; // true
    recor: boolean; // true
    vacio: boolean; // true
    dm: boolean; // false


    fecha_operario: string; // "2025-05-20T11:54:46.402275Z"
    fecha_revisador: string; // "2025-05-20T11:55:46.235414Z"
    fecha_auxiliar: string; // "2025-05-20T11:56:07.082429Z"


    operario: number; // 2
    revisador: number; // 1
    auxiliar: number; // 4
}