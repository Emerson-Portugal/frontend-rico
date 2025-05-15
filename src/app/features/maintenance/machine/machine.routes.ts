import { VexRoutes } from '@vex/interfaces/vex-route.interface'
import { CreateMachinePageComponent, ListMachinePageComponent, UpdateMachinePageComponent } from './pages'

export const MACHINE_ROUTES: VexRoutes = [
  {
    path: '',
    component: ListMachinePageComponent,
  },
  {
    path: 'create',
    component: CreateMachinePageComponent,
  },
  {
    path: ':code/update',
    component: UpdateMachinePageComponent,
  },
]
