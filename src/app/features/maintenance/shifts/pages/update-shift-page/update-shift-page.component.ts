import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShiftFormComponent } from '../../components';


@Component({
  selector: 'app-update-shift-page',
  standalone: true,
  imports: [ShiftFormComponent],
  templateUrl: './update-shift-page.component.html',
  styles: ``
})
export class UpdateShiftPageComponent {
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
