import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShiftAssignmentsFormComponent } from '../../components';


@Component({
  selector: 'app-update-shift-assignments',
  standalone: true,
  imports: [ShiftAssignmentsFormComponent],
  templateUrl: './update-shift-assignments.component.html',
  styles: ``
})
export class UpdateShiftAssignmentsComponent {
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
