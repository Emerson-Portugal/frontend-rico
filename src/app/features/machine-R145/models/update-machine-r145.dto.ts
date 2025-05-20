import { CreateMachineR145Dto } from './create-machine-r145.dto'


export type UpdateMachineR145Dto = Pick<CreateMachineR145Dto, 'recor' | 'vacio' | 'dm'> & {
observaciones: string;
};