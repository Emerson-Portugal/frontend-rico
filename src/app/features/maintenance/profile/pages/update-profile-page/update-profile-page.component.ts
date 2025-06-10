import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileFormComponent } from '../../components';


@Component({
  selector: 'app-update-profile-page',
  standalone: true,
  imports: [ProfileFormComponent],
  templateUrl: './update-profile-page.component.html',
  styles: ``
})
export class UpdateProfilePageComponent {
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
