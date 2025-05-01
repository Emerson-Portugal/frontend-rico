import { Component, input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-custom-date-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  templateUrl: './custom-date-input.component.html',
})
export class CustomDateInputComponent {
  inputClass = input<string | null>(null, { alias: 'inputClass' })
  disabled = input<boolean>(false)
  label = input<string | null>(null)
  form = input.required<FormGroup>()
  formControlName = input.required<string>({ alias: 'controlName' })
}
