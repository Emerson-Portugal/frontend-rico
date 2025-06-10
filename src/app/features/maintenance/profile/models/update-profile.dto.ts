import { CreateProfileDto } from './create-profile.dto'

export interface UpdateProfileDto extends Omit<CreateProfileDto, 'password'> { }