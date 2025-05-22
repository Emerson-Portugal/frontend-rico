import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MachineR145FormComponent } from '../../components';

@Component({
  selector: 'app-update-machine-r145-page',
  standalone: true,
  imports: [MachineR145FormComponent],
  templateUrl: './update-machine-r145-page.component.html',
  styles: ``
})
export class UpdateMachineR145PageComponent {
  private readonly route = inject(ActivatedRoute)
  code = signal<string>('')

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.code.set(params['code'])
    }).unsubscribe()
  }
}
