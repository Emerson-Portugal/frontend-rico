import { Component } from '@angular/core'
import { CustomFormHeaderComponent } from '@shared/components'
import { Tab } from '@shared/models'

@Component({
  selector: 'app-machine-form-header',
  standalone: true,
  imports: [CustomFormHeaderComponent],
  templateUrl: './machine-form-header.component.html',
  styles: ``
})
export class MachineFormHeaderComponent {
  title: string = 'Maquina'
  icon: string = 'mat:settings'
  tabs: Tab[] = [{ label: 'Informacion General', onClick: () => {}, active: true, disabled: false }]
}
