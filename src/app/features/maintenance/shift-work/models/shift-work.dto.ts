import { ShiftDto } from '@features/maintenance/shifts/models'


export interface ShiftWorkDto {
    id : number;
    code: string;
    turno: ShiftDto;
    fecha_inicio: string;
    fecha_fin: string;
}