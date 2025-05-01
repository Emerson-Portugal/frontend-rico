import { VexRoutes } from '@vex/interfaces/vex-route.interface'
import { LoginComponent } from './pages/login/login.component'

export const AUTH_ROUTES: VexRoutes = [
  {
    path: 'login',
    component: LoginComponent,
  },
]
