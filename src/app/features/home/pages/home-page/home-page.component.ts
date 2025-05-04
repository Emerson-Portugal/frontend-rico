import { Component, inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TokenService } from '@core/token/services/token.service'
import { CustomCardComponent } from '@shared/components'
import { CommonModule } from '@angular/common'  // <-- Agregar importación de CommonModule

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,  // <-- Añadir CommonModule
    CustomCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {

  userRole: string | null = null

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    // Obtener el rol del usuario desde el token
    this.userRole = this.tokenService.getRole()
  }

  private readonly router = inject(Router)

  navigateTo(path: string): void {
    this.router.navigate([path])
  }
}
