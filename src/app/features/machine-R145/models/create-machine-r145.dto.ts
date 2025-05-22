
export interface CreateMachineR145Dto {

fecha: string; // "2025-05-19"
hora_inicio: string; // "08:00:00"
hora_fin: string; // "12:00:00"
unidad_kilos: number; // 50.0

producto: string; // "6133" → string
maquina: string; // "49GK"
turno: string; // "54EF"

lote_anio: string; // "2025" → number
lote_sem: string; // "20" → number
lote_dme: string; // "DM1234"

extension_dia: string; // "15" → number
extension_dmp: string; // "EXT001"
extension_hora: string; // "08:30:00"
vencimiento: string; // "2025-06-30"

golpe: number; // true
recor: string; // false


peso: string; // 12.5
vacio: string; // false
dm: string; // false

observaciones: string;

}