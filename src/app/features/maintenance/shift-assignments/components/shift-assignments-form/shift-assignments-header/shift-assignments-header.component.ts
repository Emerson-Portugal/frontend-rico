import { Component } from '@angular/core'
import { CustomFormHeaderComponent } from '@shared/components'
import { Tab } from '@shared/models'

@Component({
  selector: 'app-shift-assignments-header',
  standalone: true,
  imports: [CustomFormHeaderComponent],
  templateUrl: './shift-assignments-header.component.html',
  styles: ``
})
export class ShiftAssignmentsHeaderComponent {
  title: string = 'Asignaciones de Turno'
  icon: string = 'mat:assignment_ind'
  tabs: Tab[] = [{ label: 'Informacion General', onClick: () => {}, active: true, disabled: false }]
}
