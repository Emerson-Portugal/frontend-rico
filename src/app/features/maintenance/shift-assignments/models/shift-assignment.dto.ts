import { AccountDto } from '@features/auth/models';
import { ShiftWorkDto } from '@features/maintenance/shift-work/models'


export interface ShiftAssignmentDto {
    id : number;
    code: string;
    turno_trabajo: ShiftWorkDto;
    usuario: AccountDto;

}