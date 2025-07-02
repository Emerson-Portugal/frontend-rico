import { Component } from '@angular/core'
import { WidgetQuickValueCenterComponent } from '@shared/third-party/layouts/components/widget-quick-value-center/widget-quick-value-center.component'


@Component({
  selector: 'app-dash-board-page',
  standalone: true,
  imports: [WidgetQuickValueCenterComponent],
  templateUrl: './dash-board-page.component.html',
  styleUrl: './dash-board-page.component.scss',
})
export class DashBoardPageComponent {

}
