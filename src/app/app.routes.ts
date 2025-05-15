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
    path: 'home',
    canActivate: [tokenGuard],
    children: HOME_ROUTES,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [tokenGuard],
    children: [
      {
        path: 'operational-management',
        canActivate: [roleGuard(['OPERADOR'])],
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/operational-management/operational-management.routes').then(x => x.OPERATIONAL_MANAGEMENT_ROUTES),
          },
        ],
      },
      {
        path: 'reviewer-management',
        canActivate: [roleGuard(['REVISADOR'])],
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/reviewer-management/reviewer-management.routes').then(x => x.REVIEWER_MANAGEMENT_ROUTES),
          },
        ],
      },
      {
        path: 'supervisor-management',
        canActivate: [roleGuard(['SUPERVISOR'])],
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/supervisor-management/supervisor-management.routes').then(x => x.SUPERVISOR_MANAGEMENT_ROUTES),
          },

        ],
      },
      {
        path: 'assistant-management',
        canActivate: [roleGuard(['AUXILIAR'])],
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/assistant-management/assistant-management.routes').then(x => x.ASSISTANT_MANAGEMENT_ROUTES),
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
