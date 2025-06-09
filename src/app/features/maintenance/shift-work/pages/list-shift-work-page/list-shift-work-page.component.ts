import { Component } from '@angular/core';
import { ShiftWorkListComponent } from '../../components';
import { CustomLayoutComponent } from '@shared/components';

@Component({
  selector: 'app-list-shift-work-page',
  standalone: true,
  imports: [CustomLayoutComponent, ShiftWorkListComponent],
  templateUrl: './list-shift-work-page.component.html',
  styles: ``
})
export class ListShiftWorkPageComponent {

}
