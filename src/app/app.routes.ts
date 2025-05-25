import { roleGuard } from '@core/token/guards/role.guard'
import { tokenGuard } from '@core/token/guards/token.guard'
import { AUTH_ROUTES } from '@features/auth/auth.routes'
import { HOME_ROUTES } from '@features/home/home.routes'
import { LayoutComponent } from '@shared/third-party/layouts/layout/layout.component'
import { VexRoutes } from '@vex/interfaces/vex-route.interface'

export const routes: VexRoutes = [
  {
    path: 'auth',
    children: [
      ...AUTH_ROUTES,
      {
        path: '**',
        loadComponent: () => import('./core/error/pages').then(m => m.Error404Component)
      },
    ],
  },
  {
    path: '',
    canActivate: [tokenGuard],
    children: HOME_ROUTES,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [tokenGuard],
    children: [
      /*Maquinas  */
      {
        path: 'machines',
        canActivate: [roleGuard(['OPERADOR', 'REVISADOR', 'SUPERVISOR', 'AUXILIAR'])],
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/operational-management/operational-management.routes').then(x => x.OPERATIONAL_MANAGEMENT_ROUTES),
          },
          {
            path: 'R145',
            loadChildren: () => import('./features/machine-R145/machine-R145.routes').then(x => x.MACHINE_R145_ROUTES),
          },
        ],
      },

      /*LOS MANTENIMIENTOS */
      {
        path: 'management',
        canActivate: [roleGuard(['ADMIN'])],
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/config/config.routes').then(x => x.CONFIG_ROUTES),
          },
          {
            path: 'products',
            loadChildren: () => import('./features/maintenance/product/product.routes').then(x => x.PRODUCT_ROUTES),
          },
          {
            path: 'machines',
            loadChildren: () => import('./features/maintenance/machine/machine.routes').then(x => x.MACHINE_ROUTES),
          },
          {
            path: 'shifts',
            loadChildren: () => import('./features/maintenance/shifts/shift.routes').then(x => x.SHIFT_ROUTES),
          },
        ],
      },


      {
        path: 'invoice',
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/invoice/invoice.routes').then(x => x.INVOICE_ROUTES),
          },

        ],
      },
      {
        path: ':prefix/reports',
        children: [

        ],
      },
      {
        path: ':prefix/maintenance',
        children: [

        ],
      },
      {
        path: '**',
        loadComponent: () => import('./core/error/pages').then(m => m.Error404Component),
      },
    ],
  },
]
