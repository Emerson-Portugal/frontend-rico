import { Component, computed, input, model } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { BasicHTMLInputTypeAttribute, Mask } from '@shared/constants'
import { SelectInputValueDirective } from '@shared/directives'
import { MaskUtil } from '@shared/utils'
import { NgxMaskDirective } from 'ngx-mask'

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    NgxMaskDirective,
    SelectInputValueDirective,
  ],
  templateUrl: './custom-input.component.html',
})
export class CustomInputComponent {
  inputClass = input<string | null>(null, { alias: 'inputClass' })
  disabled = input<boolean>(false)
  readonly = input<boolean>(false)
  required = input<boolean>(false)
  leftIcon = input<string | null>(null, { alias: 'icon' })
  placeHolder = input<string | null>(null, { alias: 'placeholder' })
  label = input<string | null>(null)
  type = input<BasicHTMLInputTypeAttribute>('text')
  form = input<FormGroup>(new FormGroup({}))
  formControlName = input<string>('', { alias: 'controlName' })
  value = model<string>()
  mask = input<Mask>('text')
  maskAllowNegative = input<boolean>(false)
  maskFormat = computed<string>(() => MaskUtil.maskFormat(this.mask()))
}
