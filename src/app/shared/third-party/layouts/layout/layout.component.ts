import { Component, inject } from '@angular/core'
import { VexLayoutService } from '@vex/services/vex-layout.service'
import { combineLatest, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { VexConfigService } from '@vex/config/vex-config.service'
import { VexSidebarComponent } from '@vex/components/vex-sidebar/vex-sidebar.component'

import { AsyncPipe, NgIf } from '@angular/common'
import { SidenavComponent } from '../components/sidenav/sidenav.component'
import { QuickpanelComponent } from '../components/quickpanel/quickpanel.component'
import { ConfigPanelComponent } from '../components/config-panel/config-panel.component'
import { MatDialogModule } from '@angular/material/dialog'
import { BaseLayoutComponent } from '../base-layout/base-layout.component'
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav'
import { SearchComponent } from '../components/toolbar/search/search.component'
import { VexProgressBarComponent } from '@vex/components/vex-progress-bar/vex-progress-bar.component'
import { VexConfig } from '@vex/config/vex-config.interface'
import { NavigationItem } from '@shared/third-party/core/navigation/navigation-item.interface'
import { NavigationLoaderService } from '@shared/third-party/core/navigation/navigation-loader.service'

@Component({
  selector: 'vex-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    BaseLayoutComponent,
    NgIf,
    AsyncPipe,
    SidenavComponent,
    QuickpanelComponent,
    VexSidebarComponent,
    ConfigPanelComponent,
    MatDialogModule,
    MatSidenavModule,
    RouterOutlet,
    SearchComponent,
    VexProgressBarComponent
  ],
  standalone: true
})
export class LayoutComponent {
  private readonly layoutService = inject(VexLayoutService)
  private readonly configService = inject(VexConfigService)
  private readonly navigationLoaderService = inject(NavigationLoaderService)
  private readonly router = inject(Router)

  private CRM_ROUTES: NavigationItem[] = [
    {
      type: 'link',
      label: 'Dashboard',
      icon: 'mat:dashboard',
      route: 'crm/dashboard',
    },
    {
      type: 'link',
      label: 'Cotizaciones',
      icon: 'mat:mail_outline',
      route: 'crm/quotes',
    },
    {
      type: 'link',
      label: 'Campañas',
      icon: 'mat:date_range',
      route: 'crm/campaigns',
    },
    {
      type: 'link',
      label: 'Pipelines',
      icon: 'mat:tab',
      route: 'crm/pipelines',
    },
    {
      type: 'link',
      label: 'Vendedores',
      icon: 'mat:group',
      route: 'crm/maintenance/accounts',
    },
    {
      type: 'dropdown',
      label: 'Informes',
      icon: 'mat:insert_chart_outlined',
      children: [
        {
          type: 'link',
          label: 'Estado de cotizaciones',
          route: 'crm/reports/quotes-status',
        },
      ],
    },
  ]
  private COMMERCIAL_MANAGEMENT_ROUTES: NavigationItem[] = [
    {
      type: 'link',
      label: 'Dashboard',
      icon: 'mat:dashboard',
      route: 'commercial-management/dashboard',
    },
    {
      type: 'link',
      label: 'Servicios De Ventas ',
      icon: 'mat:vertical_split',
      route: 'commercial-management/sales-services',
    },
    {
      type: 'link',
      label: 'Tarifario general',
      icon: 'mat:format_align_justify',
      route: 'commercial-management/general-fees',
    },
    {
      type: 'dropdown',
      label: 'Estadísticas',
      icon: 'mat:bar_chart',
      children: [
        {
          type: 'link',
          label: 'Proyección de Ventas',
          route: 'commercial-management/reports/sales-projection',
        },
        {
          type: 'link',
          label: 'Estadísticas por Cliente',
          route: 'commercial-management/reports/client-statistics',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Informes',
      icon: 'mat:insert_chart_outlined',
      children: [
        {
          type: 'link',
          label: 'Estado de servicios',
          route: 'commercial-management/reports/service-status',
        },
      ]
    },
    {
      type: 'link',
      label: 'Consignatario',
      icon: 'mat:supervisor_account',
      route: 'commercial-management/maintenance/consignees',
    },
    {
      type: 'link',
      label: 'Agencia de Aduanas',
      icon: 'mat:business',
      route: 'commercial-management/maintenance/customs-agencies',
    },
    {
      type: 'dropdown',
      label: 'Mantenedores',
      icon: 'mat:settings',
      children: [
        {
          type: 'link',
          label: 'Naves',
          route: 'commercial-management/maintenance/ships',
        },
        {
          type: 'link',
          label: 'Navieras',
          route: 'commercial-management/maintenance/shipping-companies',
        },
        {
          type: 'link',
          label: 'Puertos',
          route: 'commercial-management/maintenance/port',
        },
        {
          type: 'link',
          label: 'Ciudades',
          icon: 'mat:location_city',
          route: 'commercial-management/maintenance/cities'
        },
        {
          type: 'link',
          label: 'Tipo de Moneda',
          icon: 'mat:currency_bitcoin',
          route: 'commercial-management/maintenance/coin-types',
        },
        {
          type: 'link',
          label: 'Tipo de Servicio',
          icon: 'mat:thumbs_up_down',
          route: 'commercial-management/maintenance/service-types',
        },
        {
          type: 'link',
          label: 'Oficinas',
          icon: 'mat:business',
          route: 'commercial-management/maintenance/offices',
        },
        {
          type: 'link',
          label: 'Servicios',
          icon: 'mat:design_services',
          route: 'commercial-management/maintenance/services',
        },
        {
          type: 'link',
          label: 'Zonas',
          icon: 'mat:public',
          route: 'commercial-management/maintenance/zones',
        },
        {
          type: 'link',
          label: 'Mercaderia',
          icon: 'mat:inventory_2',
          route: 'commercial-management/maintenance/merchandise',
        },
        {
          type: 'link',
          label: 'Flota',
          route: 'commercial-management/maintenance/fleet',
        },
        {
          type: 'link',
          label: 'Depositos',
          route: 'commercial-management/maintenance/deposits',
        },
        {
          type: 'link',
          label: 'Bodegas',
          icon: 'mat:warehouse',
          route: 'commercial-management/maintenance/warehouses',
        },
        {
          type: 'link',
          label: 'Contenedores',
          icon: 'mat:work',
          route: 'commercial-management/maintenance/containers',
        },
        {
          type: 'link',
          label: 'Valores Mensuales',
          route: 'commercial-management/maintenance/monthly-values',
        },
        {
          type: 'link',
          label: 'Costo Flete',
          icon: 'mat:local_shipping',
          route: 'commercial-management/maintenance/freight-costs',
        },
        {
          type: 'link',
          label: 'Vendedores',
          icon: 'mat:store',
          route: 'commercial-management/maintenance/accounts',
        },
      ],
    },
  ]
  private OPERATIONAL_MANAGEMENT_ROUTES: NavigationItem[] = [
    {
      type: 'link',
      label: 'Dashboard',
      icon: 'mat:dashboard',
      route: 'operational-management/dashboard',
    },
    {
      type: 'link',
      label: 'Control de servicio',
      icon: 'mat:chrome_reader_mode',
      route: 'operational-management/dispatch-guides',
    },
    {
      type: 'link',
      label: 'Cumplido',
      icon: 'mat:done_all',
      route: 'operational-management/service-closures',
    },
    {
      type: 'link',
      label: 'Liquidacion de viaje',
      icon: 'mat:attach_money',
      route: 'operational-management/travel-settlement',
    },
    {
      type: 'link',
      label: 'Transportista',
      icon: 'mat:directions_bus',
      route: 'operational-management/maintenance/carriers',
    },
    {
      type: 'link',
      label: 'Conductores',
      icon: 'mat:group',
      route: 'operational-management/maintenance/driver',
    },
    {
      type: 'dropdown',
      label: 'Planificación',
      icon: 'mat:format_align_justify',
      children: [
        {
          type: 'link',
          label: 'Planificación diaria',
          route: 'operational-management/reports/daily-planning',
        },
        {
          type: 'link',
          label: 'Control de flota propia',
          route: 'operational-management/reports/control-flota',
        },
      ],
    },
    {
      type: 'link',
      label: 'Porteo',
      icon: 'mat:blur_linear',
      route: 'operational-management/maintenance/portage',
    },
    {
      type: 'link',
      label: 'Amarra',
      icon: 'mat:center_focus_weak',
      route: 'operational-management/maintenance/amarra',
    },
    {
      type: 'dropdown',
      label: 'Combustible',
      icon: 'mat:ev_station',
      children: [
        {
          type: 'link',
          label: 'Ingreso de combustible',
          route: 'operational-management/maintenance/fuel-inputs',
        },
        {
          type: 'link',
          label: 'Salida de combustible',
          route: 'operational-management/maintenance/fuel-outputs',
        },
        {
          type: 'link',
          label: 'Motivo Salida de Combustible',
          route: 'operational-management/maintenance/fuel-outlet-indicators',
        },
        {
          type: 'link',
          label: 'Storage',
          route: 'operational-management/maintenance/storages',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Activos',
      icon: 'mat:business',
      children: [
        {
          type: 'link',
          label: 'Camiones',
          route: 'operational-management/maintenance/truck',
        },
        {
          type: 'link',
          label: 'Chasis',
          route: 'operational-management/maintenance/chassis',
        },
        {
          type: 'link',
          label: 'Genset',
          route: 'operational-management/maintenance/genset',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Informes',
      icon: 'mat:insert_chart_outlined',
      children: [
        {
          type: 'link',
          label: 'Producción por camiones',
          route: 'operational-management/reports/truck-production',
        },
        {
          type: 'link',
          label: 'Producción por conductores',
          route: 'operational-management/reports/driver-production',
        },
        {
          type: 'link',
          label: 'Informe de guias terceros',
          route: 'operational-management/reports/carrier-production',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Mantenedores',
      icon: 'mat:settings',
      children: [
        {
          type: 'link',
          label: 'Estados del Activo',
          route: 'operational-management/maintenance/asset-state',
        },
        {
          type: 'link',
          label: 'Condiciones del Activo',
          route: 'operational-management/maintenance/asset-condition',
        },
        {
          type: 'link',
          label: 'Motivo Baja Activo',
          route: 'operational-management/maintenance/asset-cancellation',
        },
        {
          type: 'link',
          label: 'Tipo de Chasis',
          route: 'operational-management/maintenance/chassis-type',
        },
        {
          type: 'link',
          label: 'Conceptos de Mantenimiento',
          route: 'operational-management/maintenance/maintenance-concept',
        },
        {
          type: 'link',
          label: 'Tipos de Gastos',
          route: 'operational-management/maintenance/expense-type',
        },
        {
          type: 'link',
          label: 'Contenedores',
          icon: 'mat:work',
          route: 'operational-management/maintenance/containers',
        },
        {
          type: 'link',
          label: 'Flota',
          route: 'operational-management/maintenance/fleet',
        },
        {
          type: 'link',
          label: 'Despachadores',
          route: 'operational-management/maintenance/dispatchers',
        },
      ],
    },
  ]
  private GENERAL_MANAGEMENT_ROUTES: NavigationItem[] = [
    {
      type: 'link',
      label: 'Dashboard',
      icon: 'mat:dashboard',
      route: 'general-management/dashboard',
    },
  ]
  private ACCOUNTING_ROUTES: NavigationItem[] = [
    {
      type: 'link',
      label: 'Dashboard',
      icon: 'mat:dashboard',
      route: 'accounting/dashboard',
    },
    {
      type: 'link',
      label: 'Voucher Contabilidad',
      icon: 'mat:business',
      route: 'accounting/voucher',
    },
    {
      type: 'link',
      label: 'Voucher Proveedores',
      icon: 'mat:business',
      route: 'accounting/voucher-providers',
    },
    {
      type: 'link',
      label: 'Voucher Clientes',
      icon: 'mat:business',
      route: 'accounting/voucher-customers',
    },
    {
      type: 'link',
      label: 'Plan de Cuentas',
      icon: 'mat:business',
      route: 'accounting/accounts-plan',
    },
    {
      type: 'dropdown',
      label: 'Conciliación Bancaria',
      icon: 'mat:business',
      children: [
        {
          type: 'link',
          label: 'Ingreso de cartola por bancos',
          route: 'accounting/accounts-plan',
        },
        {
          type: 'link',
          label: 'Conciliación bancaria (Resumen)',
          route: 'accounting/accounts-plan',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Socios de Negocio',
      icon: 'mat:business',
      children: [
        {
          type: 'link',
          label: 'Clientes',
          route: 'accounting/accounts-plan',
        },
        {
          type: 'link',
          label: 'Proveedores',
          route: 'accounting/accounts-plan',
        },
      ]
    },
    {
      type: 'dropdown',
      label: 'Tesorería',
      icon: 'mat:business',
      children: [
        {
          type: 'link',
          label: 'Rendición de fondo fijo',
          route: 'accounting/treasury/fixed-fund',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Balances',
      icon: 'mat:business',
      children: [
        {
          type: 'link',
          label: 'Balance tributario',
          route: 'accounting/balances/tax-balance',
        },
        {
          type: 'link',
          label: 'Balance General',
          route: 'accounting/balances/general-balance',
        },
        {
          type: 'link',
          label: 'Estado de resultados',
          route: 'accounting/balances/income-statement',
        },
        {
          type: 'link',
          label: 'Flujo de Caja',
          route: 'accounting/balances/cash-flow',
        },
        {
          type: 'link',
          label: 'Flujo de efectivo',
          route: 'accounting/balances/cash-flow-statement',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Estructura Informes financieros',
      icon: 'mat:business',
      children: [
        {
          type: 'link',
          label: 'Estructura balance general',
          route: 'accounting/financial-structure/general-balance-structure',
        },
        {
          type: 'link',
          label: 'Detalle balance general',
          route: 'accounting/financial-structure/general-balance-detail',
        },
        {
          type: 'link',
          label: 'Estructura Estado de resultados',
          route: 'accounting/financial-structure/income-statement-structure',
        },
        {
          type: 'link',
          label: 'Cuentas estados de resultados',
          route: 'accounting/financial-structure/income-statement-accounts',
        },
        {
          type: 'link',
          label: 'Estructura flujo de caja',
          route: 'accounting/financial-structure/cash-flow-structure',
        },
        {
          type: 'link',
          label: 'Conceptos flujo de caja',
          route: 'accounting/financial-structure/cash-flow-concepts',
        },
        {
          type: 'link',
          label: 'Gestión títulos',
          route: 'accounting/financial-structure/title-management',
        },
        {
          type: 'link',
          label: 'Conceptos de gestión',
          route: 'accounting/financial-structure/management-concepts',
        },
        {
          type: 'link',
          label: 'Estructura flujo de efectivo',
          route: 'accounting/financial-structure/cash-flow-statement-structure',
        },
        {
          type: 'link',
          label: 'Conceptos flujo de efectivo',
          route: 'accounting/financial-structure/cash-flow-statement-concepts',
        },
        {
          type: 'link',
          label: 'Conceptos libros de inventarios',
          route: 'accounting/financial-structure/inventory-book-concepts',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Informes',
      icon: 'mat:insert_chart_outlined',
      children: [
        {
          type: 'link',
          label: 'Libro diario',
          route: 'accounting/reports/journal-book',
        },
        {
          type: 'link',
          label: 'Libro Mayor analítico',
          route: 'accounting/reports/analytical-ledger',
        },
        {
          type: 'link',
          label: 'Resultado por centro de costo',
          route: 'accounting/reports/cost-center-results',
        },
        {
          type: 'link',
          label: 'Libro de honorarios',
          route: 'accounting/reports/fees-book',
        },
        {
          type: 'link',
          label: 'Certificado de honorarios',
          route: 'accounting/reports/fees-certificate',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Reportes Clientes',
      icon: 'mat:business',
      children: [
        {
          type: 'link',
          label: 'Cartola Clientes',
          route: 'accounting/reports/client-statements',
        },
        {
          type: 'link',
          label: 'Collectible clientes',
          route: 'accounting/reports/client-collectibles',
        },
        {
          type: 'link',
          label: 'Tasa promedio de morosidad',
          route: 'accounting/reports/average-delinquency-rate',
        },
        {
          type: 'link',
          label: 'Tasa promedio de efectividad de cobranza',
          route: 'accounting/reports/average-collection-effectiveness',
        },
        {
          type: 'link',
          label: 'Saldos de clientes',
          route: 'accounting/reports/client-balances',
        },
        {
          type: 'link',
          label: 'Libro de ventas',
          route: 'accounting/reports/sales-book',
        },
        {
          type: 'link',
          label: 'Libro de ventas Clientes SII',
          route: 'accounting/reports/sii-client-sales-book',
        },
        {
          type: 'link',
          label: 'Libro de ventas SII nuevo',
          route: 'accounting/reports/new-sii-sales-book',
        },
        {
          type: 'link',
          label: 'Libro ventas PLANO SII',
          route: 'accounting/reports/sii-flat-sales-book',
        },
        {
          type: 'link',
          label: 'Documentos por vencer',
          route: 'accounting/reports/documents-due',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Reporte Proveedores',
      icon: 'mat:business',
      children: [
        {
          type: 'link',
          label: 'Cartola proveedores',
          route: 'accounting/reports/supplier-statements',
        },
        {
          type: 'link',
          label: 'Cartola anticipos',
          route: 'accounting/reports/advance-statements',
        },
        {
          type: 'link',
          label: 'Payable proveedores',
          route: 'accounting/reports/supplier-payables',
        },
        {
          type: 'link',
          label: 'Libro de compras',
          route: 'accounting/reports/purchase-book',
        },
        {
          type: 'link',
          label: 'Libro de compras SII',
          route: 'accounting/reports/sii-purchase-book',
        },
        {
          type: 'link',
          label: 'Libro de compras SII NUEVO',
          route: 'accounting/reports/new-sii-purchase-book',
        },
        {
          type: 'link',
          label: 'Libro de compras PLANO SII',
          route: 'accounting/reports/sii-flat-purchase-book',
        },
        {
          type: 'link',
          label: 'Documentos por pagar',
          route: 'accounting/reports/documents-payable',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Mantenedores',
      icon: 'mat:settings',
      children: [
        {
          type: 'link',
          label: 'Asientos contables',
          route: 'accounting/maintenance/accounting-entries',
        },
        {
          type: 'link',
          label: 'Tipo da anticipo',
          route: 'accounting/maintenance/advance-types',
        },
        {
          type: 'link',
          label: 'Tipo de documento',
          route: 'accounting/maintenance/document-types',
        },
        {
          type: 'link',
          label: 'Forma de pago',
          route: 'accounting/maintenance/payment-methods',
        },
        {
          type: 'link',
          label: 'Cuentas asociadas',
          route: 'accounting/maintenance/associated-accounts',
        },
        {
          type: 'link',
          label: 'Valores corrección monetaria',
          route: 'accounting/maintenance/monetary-correction-values',
        },
        {
          type: 'link',
          label: 'Impuestos',
          route: 'accounting/maintenance/taxes',
        },
        {
          type: 'link',
          label: 'Centros de costo',
          route: 'accounting/maintenance/cost-centers',
        },
        {
          type: 'link',
          label: 'Actividad económica',
          route: 'accounting/maintenance/economic-activities',
        },
        {
          type: 'link',
          label: 'Collectible',
          route: 'accounting/maintenance/collectibles',
        },
        {
          type: 'link',
          label: 'Payable',
          route: 'accounting/maintenance/payables',
        },
        {
          type: 'link',
          label: 'Bancos',
          route: 'accounting/maintenance/banks',
        },
        {
          type: 'link',
          label: 'Tipo de cambio',
          route: 'accounting/maintenance/exchange-rates',
        },
      ],
    },
  ]
  private ACTIVES_ROUTES: NavigationItem[] = [
    {
      type: 'link',
      label: 'Dashboard',
      icon: 'mat:dashboard',
      route: 'actives/dashboard',
    },
    {
      type: 'link',
      label: 'Hoja de activos',
      icon: 'mat:business',
      route: 'actives/asset-sheet',
    },
    {
      type: 'link',
      label: 'Generar Activo y depreciación',
      icon: 'mat:business',
      route: 'actives/generate-asset-depreciation',
    },
    {
      type: 'link',
      label: 'Generar reversa de depreciación',
      icon: 'mat:business',
      route: 'actives/generate-reverse-depreciation',
    },
    {
      type: 'dropdown',
      label: 'Mantenedores',
      icon: 'mat:settings',
      children: [
        {
          type: 'link',
          label: 'IPC',
          route: 'actives/maintenance/ipc',
        },
        {
          type: 'link',
          label: 'Categorías',
          route: 'actives/maintenance/categories',
        },
        {
          type: 'link',
          label: 'Ubicación',
          route: 'actives/maintenance/locations',
        },
        {
          type: 'link',
          label: 'Usuarios',
          route: 'actives/maintenance/users',
        },
      ],
    },
  ]
  private REMUNERATION_ROUTES: NavigationItem[] = [
    {
      type: 'link',
      label: 'Dashboard',
      icon: 'mat:dashboard',
      route: 'remuneration/dashboard',
    },
  ]
  private CONFIG_ROUTES: NavigationItem[] = [
    {
      type: 'link',
      label: 'Dashboard',
      icon: 'mat:dashboard',
      route: 'config/dashboard',
    },
  ]
  private INVOICE_ROUTES: NavigationItem[] = [
    {
      type: 'link',
      label: 'Dashboard',
      icon: 'mat:dashboard',
      route: 'invoice/dashboard',
    },
    {
      type: 'link',
      label: 'Facturación Afecta',
      icon: 'mat:vertical_split',
      route: 'invoice/afecta',
    },
    {
      type: 'link',
      label: 'Facturación Exenta',
      icon: 'mat:format_align_justify',
      route: 'invoice/exenta',
    },
    {
      type: 'link',
      label: 'Nota de Crédito',
      icon: 'mat:calendar_view_day',
      route: 'invoice/credit-note',
    },
    {
      type: 'link',
      label: 'Nota de Débito',
      icon: 'mat:assignment',
      route: 'invoice/debit-note',
    },
    {
      type: 'link',
      label: 'Clientes',
      icon: 'mat:group',
      route: 'invoice/clients',
    },
    {
      type: 'link',
      label: 'Facturación de Proveedores',
      icon: 'mat:business',
      route: 'invoice/providers',
    },
    {
      type: 'dropdown',
      label: 'Informes',
      icon: 'mat:insert_chart_outlined',
      children: [
        {
          type: 'link',
          label: 'Libro de ventas',
          route: 'invoice/reports/sells-book',
        },
      ]
    },
    {
      type: 'dropdown',
      label: 'Mantenedores',
      icon: 'mat:settings',
      children: [
        {
          type: 'link',
          label: 'Conceptos de facturación',
          route: 'invoice/maintenance/concepts',
        },
        {
          type: 'link',
          label: 'Tipo de Cambio',
          icon: 'mat:currency_exchange',
          route: 'invoice/maintenance/exchange-rates',
        },
        {
          type: 'link',
          label: 'Collectible',
          icon: 'mat:collections_bookmark',
          route: 'invoice/maintenance/collectibles',
        },
        {
          type: 'link',
          label: 'Vendedores',
          icon: 'mat:store',
          route: 'invoice/maintenance/accounts',
        },
        {
          type: 'link',
          label: 'Ciudades',
          icon: 'mat:location_city',
          route: 'invoice/maintenance/cities',
        },
        {
          type: 'link',
          label: 'Actividad Economica',
          icon: 'mat:business_center',
          route: 'invoice/maintenance/economic-activities',
        },
        {
          type: 'link',
          label: 'Forma de Pago',
          icon: 'mat:payment',
          route: 'invoice/maintenance/payment-types',
        },
        {
          type: 'link',
          label: 'Tipo de Cuenta',
          icon: 'mat:account_balance_wallet',
          route: 'invoice/maintenance/account-types',
        },
        {
          type: 'link',
          label: 'Bancos',
          icon: 'mat:account_balance',
          route: 'invoice/maintenance/banks',
        },
        {
          type: 'link',
          label: 'Contenedores',
          icon: 'mat:work',
          route: 'invoice/maintenance/containers',
        },
        {
          type: 'link',
          label: 'Tipo de orden de compra',
          route: 'invoice/maintenance/buy-order-types',
        },
      ]
    },
  ]

  config$: Observable<VexConfig> = this.configService.config$
  sidenavCollapsed$: Observable<boolean> = this.layoutService.sidenavCollapsed$
  sidenavDisableClose$: Observable<boolean> = this.layoutService.isDesktop$
  sidenavFixedInViewport$: Observable<boolean> =
    this.layoutService.isDesktop$.pipe(map((isDesktop) => !isDesktop))
  sidenavMode$: Observable<MatDrawerMode> = combineLatest([
    this.layoutService.isDesktop$,
    this.configService.select((config) => config.layout)
  ]).pipe(
    map(([isDesktop, layout]) =>
      !isDesktop || layout === 'vertical' ? 'over' : 'side'
    )
  )
  sidenavOpen$: Observable<boolean> = this.layoutService.sidenavOpen$
  configPanelOpen$: Observable<boolean> = this.layoutService.configPanelOpen$
  quickpanelOpen$: Observable<boolean> = this.layoutService.quickpanelOpen$

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const routes: NavigationItem[] = []
        const currentRoute = this.router.url
        if (currentRoute.includes('/crm')) routes.push(...this.CRM_ROUTES)
        if (currentRoute.includes('/commercial-management')) routes.push(...this.COMMERCIAL_MANAGEMENT_ROUTES)
        if (currentRoute.includes('/operational-management')) routes.push(...this.OPERATIONAL_MANAGEMENT_ROUTES)
        if (currentRoute.includes('/general-management')) routes.push(...this.GENERAL_MANAGEMENT_ROUTES)
        if (currentRoute.includes('/accounting')) routes.push(...this.ACCOUNTING_ROUTES)
        if (currentRoute.includes('/actives')) routes.push(...this.ACTIVES_ROUTES)
        if (currentRoute.includes('/remuneration')) routes.push(...this.REMUNERATION_ROUTES)
        if (currentRoute.includes('/config')) routes.push(...this.CONFIG_ROUTES)
        if (currentRoute.includes('/invoice')) routes.push(...this.INVOICE_ROUTES)

        this.navigationLoaderService.loadNavigation(routes)
      })
  }

  onSidenavClosed(): void {
    this.layoutService.closeSidenav()
  }

  onQuickpanelClosed(): void {
    this.layoutService.closeQuickpanel()
  }
}
