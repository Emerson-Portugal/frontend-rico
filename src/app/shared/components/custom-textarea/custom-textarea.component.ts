import { Component, input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { TextFieldModule } from '@angular/cdk/text-field';


@Component({
  selector: 'app-custom-textarea',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TextFieldModule 
  ],
  templateUrl: './custom-textarea.component.html',
})
export class CustomTextareaComponent {
  inputClass = input<string | null>(null, { alias: 'inputClass' })
  disabled = input<boolean>(false)
  placeHolder = input<string | null>(null, { alias: 'placeholder' })
  label = input<string | null>(null)
  cols = input<number>()
  rows = input<number>()
  resizable = input<boolean>(false)
  maxLength = input<number | null>(null, { alias: 'maxlength' })
  form = input.required<FormGroup>()
  formControlName = input.required<string>({ alias: 'controlName' })
}
