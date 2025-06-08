import { Component, input } from '@angular/core'
import { CustomFormHeaderComponent } from '@shared/components'
import { Tab } from '@shared/models'


@Component({
  selector: 'app-machine-r145-form-header',
  standalone: true,
  imports: [CustomFormHeaderComponent],
  templateUrl: './machine-r145-form-header.component.html',
  styles: ``
})
export class MachineR145FormHeaderComponent {
  title: string = 'Maquina R145'
  icon: string = 'mat:construction'
  tabs = input.required<Tab[]>()
}