import { CreateMachineDto } from './create-machine.dto'

export interface UpdateMachineDto extends Omit<CreateMachineDto, 'code'> { }