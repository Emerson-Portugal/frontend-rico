import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { CustomCardComponent } from '@shared/components'

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CustomCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly router = inject(Router)

  navigateTo(path: string): void {
    this.router.navigate([path])
  }
}
