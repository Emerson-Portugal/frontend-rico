import { Component, input, signal } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { CustomSelectContent } from '@shared/models'

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './custom-select.component.html',
})
export class CustomSelectComponent {
  inputClass = input<string | null>(null, { alias: 'inputClass' })
  disabled = input<boolean>(false)
  label = input<string | null>(null)
  form = input.required<FormGroup>()
  formControlName = input.required<string>({ alias: 'controlName' })
  dropDownItems = input.required<CustomSelectContent[]>()
  value = signal<string>('')
}
