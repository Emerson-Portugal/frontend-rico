import { Component } from '@angular/core';
import { MachineListComponent } from '../../components';
import { CustomLayoutComponent } from '@shared/components';
@Component({
  selector: 'app-list-machine-page',
  standalone: true,
  imports: [MachineListComponent, CustomLayoutComponent],
  templateUrl: './list-machine-page.component.html',
  styles: ``
})
export class ListMachinePageComponent {

}
