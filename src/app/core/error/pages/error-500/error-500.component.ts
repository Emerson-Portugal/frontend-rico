import { Component, OnInit } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'error-500',
  templateUrl: './error-500.component.html',
  standalone: true,
  imports: [MatIconModule]
})
export class Error500Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
