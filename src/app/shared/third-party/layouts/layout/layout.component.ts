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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { MatIconModule } from '@angular/material/icon'

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
    VexProgressBarComponent,
    MatIconModule
  ],
  standalone: true
})
export class LayoutComponent {
  private readonly layoutService = inject(VexLayoutService)
  private readonly configService = inject(VexConfigService)
  private readonly navigationLoaderService = inject(NavigationLoaderService)
  private readonly router = inject(Router)

  private readonly breakpointObserver = inject(BreakpointObserver)

  isMobile$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    .pipe(map(result => result.matches));

  private ROUTES_HOME: NavigationItem[] = [

    {
      type: 'link',
      label: 'Página Principal',
      icon: 'mat:home',
      route: '',
    },

  ]


  private ROUTES_MACHINE: NavigationItem[] = [

    {
      type: 'dropdown',
      label: 'Máquinas',
      icon: 'mat:settings',
      children: [
        {
          type: 'link',
          label: 'Máquina R145',
          route: 'machines/R145',
        },
        {
          type: 'link',
          label: 'Maquina Puma',
          route: 'machines/Puma',
        },
      ],
    },

  ]
  private ROUTES_MANAGEMENT: NavigationItem[] = [

    {
      type: 'dropdown',
      label: 'Mantenimientos',
      icon: 'mat:settings_applications',
      children: [
        {
          type: 'link',
          label: 'Mantenimientos Productos',
          route: 'management/products',
        },
        {
          type: 'link',
          label: 'Mantenimientos Maquinas',
          route: 'management/machines',
        },
        {
          type: 'link',
          label: 'Mantenimientos Turnos',
          route: 'management/shifts',
        },
      ],
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
        if (/^\/machines\//.test(currentRoute)) {
          routes.push(...this.ROUTES_MACHINE)
        }
        if (/^\/management\//.test(currentRoute)) {
          routes.push(...this.ROUTES_MANAGEMENT)
        }
        if (currentRoute === '/' || currentRoute === '') {
          routes.push(...this.ROUTES_HOME)
        }


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
