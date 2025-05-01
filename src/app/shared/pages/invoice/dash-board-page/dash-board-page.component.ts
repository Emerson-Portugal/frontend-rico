import { Component } from '@angular/core'
import { WidgetLargeGoalChartComponent } from '@shared/third-party/layouts/components/widget-large-goal-chart/widget-large-goal-chart.component'
import { WidgetQuickValueCenterComponent } from '@shared/third-party/layouts/components/widget-quick-value-center/widget-quick-value-center.component'

@Component({
  selector: 'app-dash-board-page',
  standalone: true,
  imports: [
    WidgetQuickValueCenterComponent,
    WidgetLargeGoalChartComponent,
  ],
  templateUrl: './dash-board-page.component.html',
  styleUrl: './dash-board-page.component.scss',
})
export class DashBoardPageComponent {
  series: ApexAxisChartSeries = [
    {
      name: 'Subscribers',
      data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44]
    }
  ]
  salesSeries: ApexAxisChartSeries = [
    {
      name: 'Sales',
      data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87]
    }
  ]
}
