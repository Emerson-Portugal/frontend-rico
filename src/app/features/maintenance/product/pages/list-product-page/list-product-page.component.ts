import { Component } from '@angular/core';
import { ProductListComponent } from '../../components';
import { CustomLayoutComponent } from '@shared/components';

@Component({
  selector: 'app-list-product-page',
  standalone: true,
  imports: [ProductListComponent, CustomLayoutComponent],
  templateUrl: './list-product-page.component.html',
  styles: ``
})
export class ListProductPageComponent {

}
