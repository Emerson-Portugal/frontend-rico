import { Component } from '@angular/core';
import { ShiftListComponent } from '../../components';
import { CustomLayoutComponent } from '@shared/components';


@Component({
  selector: 'app-list-shift-page',
  standalone: true,
  imports: [CustomLayoutComponent, ShiftListComponent],
  templateUrl: './list-shift-page.component.html',
  styles: ``
})
export class ListShiftPageComponent {

}
