import { CreateShiftDto } from './create-shift.dto'

export interface UpdateShiftDto extends Omit<CreateShiftDto, 'code'> { }