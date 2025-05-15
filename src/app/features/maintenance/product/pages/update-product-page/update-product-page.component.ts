import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductFormComponent } from '../../components';

@Component({
  selector: 'app-update-product-page',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './update-product-page.component.html',
  styles: ``
})
export class UpdateProductPageComponent {
  private readonly route = inject(ActivatedRoute)
  code = signal<string>('')

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.code.set(params['code'])
      })
      .unsubscribe()
  }
}
