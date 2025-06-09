import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShiftWorkFormComponent } from '../../components';

@Component({
  selector: 'app-update-shift-work-page',
  standalone: true,
  imports: [ShiftWorkFormComponent],
  templateUrl: './update-shift-work-page.component.html',
  styles: ``
})
export class UpdateShiftWorkPageComponent {
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
