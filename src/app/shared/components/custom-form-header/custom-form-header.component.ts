import { TitleCasePipe } from '@angular/common'
import { AfterViewInit, Component, inject, input, signal } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { Router } from '@angular/router'
import { Tab } from '@shared/models'
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation'
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation'
import { scaleIn400ms } from '@vex/animations/scale-in.animation'

@Component({
  selector: 'app-custom-form-header',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatTabsModule,
    MatIconModule,
  ],
  animations: [scaleIn400ms, fadeInUp400ms, fadeInRight400ms],
  templateUrl: './custom-form-header.component.html',
})
export class CustomFormHeaderComponent implements AfterViewInit {
  private readonly router = inject(Router)

  title = input('')
  icon = input('')
  tabs = input.required<Tab[]>()
  isElementActive = input<boolean>(true)
  disabledText = input<string>('Anulado')
  isCreate = signal<boolean>(true)

  ngAfterViewInit(): void {
    this.isCreate.set(this.router.url.includes('create'))
  }
}
