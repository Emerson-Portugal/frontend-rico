import { VexRoutes } from '@vex/interfaces/vex-route.interface'
import { CreateShiftAssignmentsComponent, ListShiftAssignmentsComponent, UpdateShiftAssignmentsComponent } from './pages'

export const SHIFT_ASSIGNMENTS_ROUTES: VexRoutes = [
  {
    path: '',
    component: ListShiftAssignmentsComponent,
  },
  {
    path: 'create',
    component: CreateShiftAssignmentsComponent,
  },
  {
    path: ':code/update',
    component: UpdateShiftAssignmentsComponent,
  },
]
