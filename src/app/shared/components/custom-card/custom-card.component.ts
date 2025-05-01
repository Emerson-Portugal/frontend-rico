import { Component, input } from '@angular/core'

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [],
  templateUrl: './custom-card.component.html'
})
export class CustomCardComponent {
  content = input<string>('')
  imageUrl = input<string>('')
}
