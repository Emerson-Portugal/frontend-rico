import { Component } from '@angular/core'
import { CustomFormHeaderComponent } from '@shared/components'
import { Tab } from '@shared/models'


@Component({
  selector: 'app-shift-form-header',
  standalone: true,
  imports: [CustomFormHeaderComponent],
  templateUrl: './shift-form-header.component.html',
  styles: ``
})
export class ShiftFormHeaderComponent {
  title: string = 'Turnos'
  icon: string = 'mat:access_time'
  tabs: Tab[] = [{ label: 'Informacion General', onClick: () => {}, active: true, disabled: false }]
}
