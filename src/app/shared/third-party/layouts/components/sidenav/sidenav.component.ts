import { Component, Input, OnInit } from '@angular/core'
import { NavigationService } from '../../../core/navigation/navigation.service'
import { VexLayoutService } from '@vex/services/vex-layout.service'
import { VexConfigService } from '@vex/config/vex-config.service'
import { map, startWith, switchMap } from 'rxjs/operators'
import { NavigationItem } from '../../../core/navigation/navigation-item.interface'
import { VexPopoverService } from '@vex/components/vex-popover/vex-popover.service'
import { Observable, of } from 'rxjs'
import { SidenavUserMenuComponent } from './sidenav-user-menu/sidenav-user-menu.component'
import { MatDialog } from '@angular/material/dialog'
import { SearchModalComponent } from './search-modal/search-modal.component'
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component'
import { VexScrollbarComponent } from '@vex/components/vex-scrollbar/vex-scrollbar.component'
import { MatRippleModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { AsyncPipe, NgFor, NgIf } from '@angular/common'
import { AuthService } from '@features/auth/services/auth.service'
import { AccountDto } from '@features/auth/models'
import { Router } from '@angular/router'

@Component({
  selector: 'vex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    VexScrollbarComponent,
    NgFor,
    SidenavItemComponent,
    AsyncPipe
  ]
})
export class SidenavComponent implements OnInit {
  @Input() collapsed: boolean = false
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$
  title$ = this.configService.config$.pipe(
    map((config) => config.sidenav.title)
  )
  imageUrl$ = this.configService.config$.pipe(
    map((config) => config.sidenav.imageUrl)
  )
  showCollapsePin$ = this.configService.config$.pipe(
    map((config) => config.sidenav.showCollapsePin)
  )
  userVisible$ = this.configService.config$.pipe(
    map((config) => config.sidenav.user.visible)
  )
  searchVisible$ = this.configService.config$.pipe(
    map((config) => config.sidenav.search.visible)
  )

  userMenuOpen$: Observable<boolean> = of(false)

  items$: Observable<NavigationItem[]> = this.navigationService.items$

  account$: Observable<AccountDto> = of()

  sidenavTitle$: Observable<string> = of('')

  constructor(
    private navigationService: NavigationService,
    private layoutService: VexLayoutService,
    private configService: VexConfigService,
    private readonly popoverService: VexPopoverService,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.router.events
      .subscribe(() => {
        const currentRoute = this.router.url
        if (currentRoute.includes('/crm')) this.sidenavTitle$ = of('CRM')
        if (currentRoute.includes('/commercial-management')) this.sidenavTitle$ = of('Gestión Comercial')
        if (currentRoute.includes('/operational-management')) this.sidenavTitle$ = of('Gestión Operacional')
        if (currentRoute.includes('/general-management')) this.sidenavTitle$ = of('Gestión Gerencial')
        if (currentRoute.includes('/accounting')) this.sidenavTitle$ = of('Contabilidad')
        if (currentRoute.includes('/actives')) this.sidenavTitle$ = of('Activo Fijo')
        if (currentRoute.includes('/remuneration')) this.sidenavTitle$ = of('Remuneraciones')
        if (currentRoute.includes('/config')) this.sidenavTitle$ = of('Configuración')
        if (currentRoute.includes('/invoice')) this.sidenavTitle$ = of('Facturación')
      })
  }

  ngOnInit() {
    this.authService.getAccountSession().subscribe({
      next: ({ data }) => this.account$ = of(data),
    })
  }

  collapseOpenSidenav() {
    this.layoutService.collapseOpenSidenav()
  }

  collapseCloseSidenav() {
    this.layoutService.collapseCloseSidenav()
  }

  toggleCollapse() {
    this.collapsed
      ? this.layoutService.expandSidenav()
      : this.layoutService.collapseSidenav()
  }

  trackByRoute(index: number, item: NavigationItem): string {
    if (item.type === 'link') {
      return item.route
    }

    return item.label
  }

  openProfileMenu(origin: HTMLDivElement): void {
    this.userMenuOpen$ = of(
      this.popoverService.open({
        content: SidenavUserMenuComponent,
        origin,
        offsetY: -8,
        width: origin.clientWidth,
        position: [
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom'
          }
        ]
      })
    ).pipe(
      switchMap((popoverRef) => popoverRef.afterClosed$.pipe(map(() => false))),
      startWith(true)
    )
  }

  openSearch(): void {
    this.dialog.open(SearchModalComponent, {
      panelClass: 'vex-dialog-glossy',
      width: '100%',
      maxWidth: '600px'
    })
  }
}
