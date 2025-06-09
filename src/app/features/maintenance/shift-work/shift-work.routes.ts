import { VexRoutes } from '@vex/interfaces/vex-route.interface'
import { CreateShiftWorkPageComponent, ListShiftWorkPageComponent, UpdateShiftWorkPageComponent} from './pages'

export const SHIFT_WORK_ROUTES: VexRoutes = [
  {
    path: '',
    component: ListShiftWorkPageComponent,
  },
  {
    path: 'create',
    component: CreateShiftWorkPageComponent,
  },
  {
    path: ':code/update',
    component: UpdateShiftWorkPageComponent,
  },
]
