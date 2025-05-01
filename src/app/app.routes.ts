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
        path: 'accounting',
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/accounting/accounting.routes').then(x => x.ACCOUNTING_ROUTES),
          },
        ],
      },
      {
        path: 'actives',
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/actives/actives.routes').then(x => x.ACTIVES_ROUTES),
          },
        ],
      },
      {
        path: 'commercial-management',
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/commercial-management/commercial-management.routes').then(x => x.COMMERCIAL_MANAGEMENT_ROUTES),
          },

        ],
      },
      {
        path: 'config',
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/config/config.routes').then(x => x.CONFIG_ROUTES),
          },
        ],
      },
      {
        path: 'crm',
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/crm/crm.routes').then(x => x.CRM_ROUTES),
          },

          {
            path: 'campaigns',
            children: [],
          },
        ],
      },
      {
        path: 'general-management',
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/general-management/general-management.routes').then(x => x.GENERAL_MANAGEMENT_ROUTES),
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
        path: 'operational-management',
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/operational-management/operational-management.routes').then(x => x.OPERATIONAL_MANAGEMENT_ROUTES),
          },
        ],
      },
      {
        path: 'remuneration',
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./shared/pages/remuneration/remuneration.routes').then(x => x.REMUNERATION_ROUTES),
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
