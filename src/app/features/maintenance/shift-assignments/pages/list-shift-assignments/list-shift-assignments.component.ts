import { Component } from '@angular/core';
import { ShiftAssignmentsListComponent } from '../../components';
import { CustomLayoutComponent } from '@shared/components';


@Component({
  selector: 'app-list-shift-assignments',
  standalone: true,
  imports: [CustomLayoutComponent, ShiftAssignmentsListComponent],
  templateUrl: './list-shift-assignments.component.html',
  styles: ``
})
export class ListShiftAssignmentsComponent {

}
