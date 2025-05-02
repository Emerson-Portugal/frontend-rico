import { Component, input } from '@angular/core'
import { CustomFormHeaderComponent } from '@shared/components'
import { Tab } from '@shared/models'

@Component({
  selector: 'app-operator-log-form-header',
  standalone: true,
  imports: [CustomFormHeaderComponent],
  templateUrl: './operator-log-form-header.component.html',
  styles: ``
})
export class OperatorLogFormHeaderComponent {
  title: string = 'Formulario del Operario'
  icon: string = 'mat:engineering'
  tabs = input.required<Tab[]>()
}
