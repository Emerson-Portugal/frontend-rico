import {
  Component,
  input,
  effect,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-custom-hour',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './custom-hour.component.html',
})
export class CustomHourComponent implements AfterViewInit {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  inputClass = input<string | null>(null, { alias: 'inputClass' });
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  label = input<string | null>(null);
  placeholder = input<string>('HH:mm');

  form = input.required<FormGroup>();
  formControlName = input.required<string>({ alias: 'controlName' });

  ngAfterViewInit(): void {
    const control = this.form().get(this.formControlName());
    if (!control) return;

    const inputEl = this.inputRef.nativeElement;

    inputEl.addEventListener('input', () => {
      let raw = inputEl.value.replace(/[^\d]/g, '');

      if (raw.length <= 2) {
        inputEl.value = raw;
        control.setValue(raw, { emitEvent: false });
        return;
      }

      if (raw.length > 4) raw = raw.substring(0, 4);

      const hh = raw.substring(0, 2);
      const mm = raw.substring(2);

      const formatted = `${hh}:${mm}`;
      inputEl.value = formatted;
      control.setValue(formatted, { emitEvent: false });
    });

    // Al perder el foco, asegura el formato HH:MM con ceros
    inputEl.addEventListener('blur', () => {
      const val = control.value;
      if (typeof val !== 'string') return;

      const [h = '', m = ''] = val.split(':');
      const hh = h.padStart(2, '0');
      const mm = m.padStart(2, '0');

      const final = `${hh}:${mm}`;
      inputEl.value = final;
      control.setValue(final, { emitEvent: false });
    });
  }
}
