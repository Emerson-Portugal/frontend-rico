import { Component, computed, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { SelectInputValueDirective } from '@shared/directives';
import { BasicHTMLInputTypeAttribute } from '@shared/constants';
import { scaleIn400ms } from '@vex/animations/scale-in.animation'
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';

@Component({
  selector: 'app-custom-hour',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    NgxMaskDirective,
  ],
    animations: [scaleIn400ms, fadeInUp400ms, fadeInRight400ms],
  
  templateUrl: './custom-hour.component.html'
})
export class CustomHourComponent {
  inputClass = input<string | null>(null, { alias: 'inputClass' });
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  icon  = input('');
  placeHolder = input<string | null>(null, { alias: 'placeholder' });
  label = input<string | null>(null);
  type = input<BasicHTMLInputTypeAttribute>('text');
  form = input<FormGroup>(new FormGroup({}));
  formControlName = input<string>('', { alias: 'controlName' });
  value = model<string>();

  readonly timeMask = computed(() => 'Hh:m0'); // HH:mm mask
}
