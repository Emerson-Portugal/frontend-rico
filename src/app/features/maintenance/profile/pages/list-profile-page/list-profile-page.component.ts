import { Component } from '@angular/core';
import { ProfileListComponent } from '../../components';
import { CustomLayoutComponent } from '@shared/components';


@Component({
  selector: 'app-list-profile-page',
  standalone: true,
  imports: [ProfileListComponent, CustomLayoutComponent],
  templateUrl: './list-profile-page.component.html',
  styles: ``
})
export class ListProfilePageComponent {

}
