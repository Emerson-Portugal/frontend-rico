import { Component } from '@angular/core'
import { CustomFormHeaderComponent } from '@shared/components'
import { Tab } from '@shared/models'

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CustomFormHeaderComponent],
  templateUrl: './profile-header.component.html',
  styles: ``
})
export class ProfileHeaderComponent {
  title: string = 'Lista de Perfiles'
  icon: string = 'mat:account_circle'
  tabs: Tab[] = [
    { label: 'Informacion General', onClick: () => { }, active: true, disabled: false },
  ]
}
