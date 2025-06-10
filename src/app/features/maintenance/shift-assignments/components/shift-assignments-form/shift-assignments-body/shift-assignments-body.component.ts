import { Component, effect, inject, input, model, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreateShiftWorkDto, UpdateShiftWorkDto, ShiftWorkDto} from '@features/maintenance/shift-assignments/models';
import { RegexPatterns } from '@shared/constants';
import { DateUtil, EnumUtil, ValidatorUtil } from '@shared/utils';
import { Subscription } from 'rxjs';
import { CustomInputModalComponent} from '@shared/components'


import { ShiftModalComponent } from '@features/maintenance/shift-work/components'
import { ShiftDto } from '@features/maintenance/shift-work/models'
import { ShiftService } from '@features/maintenance/shift-work/services'



import { ShiftModalComponent } from '@features/maintenance/shift-work/components'
import { ShiftDto } from '@features/maintenance/shift-work/models'
import { ShiftService } from '@features/maintenance/shift-work/services'

@Component({
  selector: 'app-shift-assignments-body',
  standalone: true,
  imports: [],
  templateUrl: './shift-assignments-body.component.html',
  styles: ``
})
export class ShiftAssignmentsBodyComponent {

}
