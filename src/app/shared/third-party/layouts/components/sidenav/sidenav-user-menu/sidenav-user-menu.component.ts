import { Component, inject } from '@angular/core'
import { VexPopoverRef } from '@vex/components/vex-popover/vex-popover-ref'
import { MatRippleModule } from '@angular/material/core'
import { Router } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { TokenService } from '@core/token/services/token.service'

@Component({
  selector: 'vex-sidenav-user-menu',
  templateUrl: './sidenav-user-menu.component.html',
  styleUrls: ['./sidenav-user-menu.component.scss'],
  imports: [MatRippleModule, MatIconModule],
  standalone: true
})
export class SidenavUserMenuComponent {
  private readonly tokenService = inject(TokenService)
  private readonly router = inject(Router)
  private readonly popoverRef = inject(VexPopoverRef)

  home(): void {
    this.router.navigate([''])
    setTimeout(() => this.popoverRef.close(), 250)
  }

  close(): void {
    /** Wait for animation to complete and then close */
    this.tokenService.clearToken()
    this.router.navigate(['auth', 'login'])
    setTimeout(() => this.popoverRef.close(), 250)
  }
}
