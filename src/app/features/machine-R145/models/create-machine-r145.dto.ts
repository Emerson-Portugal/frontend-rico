
export interface CreateMachineR145Dto {
fecha: string; // "2025-05-19"
hora_inicio: string; // "08:00:00"
hora_fin: string; // "12:00:00"
unidad_kilos: number; // 50.0

producto: number; // "6133" → number
maquina: string; // "49GK"
turno: string; // "54EF"

lote_anio: number; // "2025" → number
lote_sem: number; // "20" → number
lote_dme: string; // "DM1234"
extension_dia: number; // "15" → number
extension_dmp: string; // "EXT001"
extension_hora: string; // "08:30:00"
vencimiento: string; // "2025-06-30"

golpe: boolean; // true
peso: number; // 12.5

recor: boolean; // false
vacio: boolean; // false
dm: boolean; // false
}