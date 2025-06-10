import { VexRoutes } from '@vex/interfaces/vex-route.interface'
import { CreateShiftPageComponent, ListShiftPageComponent, UpdateShiftPageComponent} from './pages'

export const SHIFT_ROUTES: VexRoutes = [
  {
    path: '',
    component: ListShiftPageComponent,
  },
  {
    path: 'create',
    component: CreateShiftPageComponent,
  },
  {
    path: ':code/update',
    component: UpdateShiftPageComponent,
  },
]
