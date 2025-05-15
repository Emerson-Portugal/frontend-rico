import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MachineFormComponent } from '../../components/machine-form/machine-form.component';


@Component({
  selector: 'app-update-machine-page',
  standalone: true,
  imports: [MachineFormComponent],
  templateUrl: './update-machine-page.component.html',
  styles: ``
})
export class UpdateMachinePageComponent {
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
