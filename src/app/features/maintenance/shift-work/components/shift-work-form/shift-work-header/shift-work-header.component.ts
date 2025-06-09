import { Component } from '@angular/core'
import { CustomFormHeaderComponent } from '@shared/components'
import { Tab } from '@shared/models'

@Component({
  selector: 'app-shift-work-header',
  standalone: true,
  imports: [CustomFormHeaderComponent],
  templateUrl: './shift-work-header.component.html',
  styles: ``
})
export class ShiftWorkHeaderComponent {
  title: string = 'Turnos de Trabajo'
  icon: string = 'mat:work'
  tabs: Tab[] = [{ label: 'Informacion General', onClick: () => {}, active: true, disabled: false }]
}
