import { VexRoutes } from '@vex/interfaces/vex-route.interface'
import { CreateMachineR145PageComponent, ListMachineR145PageComponent, UpdateMachineR145PageComponent} from './pages'

export const MACHINE_R145_ROUTES: VexRoutes = [
  {
    path: '',
    component: ListMachineR145PageComponent,
  },
  {
    path: 'create',
    component: CreateMachineR145PageComponent,
  },
  {
    path: ':code/update',
    component: UpdateMachineR145PageComponent,
  },
]
