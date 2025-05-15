import { Component } from '@angular/core'
import { CustomFormHeaderComponent } from '@shared/components'
import { Tab } from '@shared/models'

@Component({
  selector: 'app-product-header',
  standalone: true,
  imports: [CustomFormHeaderComponent],
  templateUrl: './product-header.component.html',
  styles: ``
})
export class ProductHeaderComponent {
  title: string = 'Productos'
  icon: string = 'mat:shopping_cart'
  tabs: Tab[] = [{ label: 'Informacion General', onClick: () => {}, active: true, disabled: false }]
}
