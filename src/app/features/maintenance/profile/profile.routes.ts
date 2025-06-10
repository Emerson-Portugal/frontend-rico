import { VexRoutes } from '@vex/interfaces/vex-route.interface'
import {CreateProfilePageComponent, ListProfilePageComponent, UpdateProfilePageComponent} from './pages'

export const PROFILE_ROUTES: VexRoutes = [
  {
    path: '',
    component: ListProfilePageComponent,
  },
  {
    path: 'create',
    component: CreateProfilePageComponent,
  },
  {
    path: ':code/update',
    component: UpdateProfilePageComponent,
  },
]
