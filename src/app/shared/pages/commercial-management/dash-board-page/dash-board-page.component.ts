import { Component } from '@angular/core'
import { WidgetLargeGoalChartComponent } from '@shared/third-party/layouts/components/widget-large-goal-chart/widget-large-goal-chart.component'
import { WidgetQuickValueCenterComponent } from '@shared/third-party/layouts/components/widget-quick-value-center/widget-quick-value-center.component'
import { WidgetTableComponent } from '@shared/third-party/layouts/components/widget-table/widget-table.component'
import { Order, tableSalesData } from '@shared/third-party/static-data/table-sales-data'
import { TableColumn } from '@vex/interfaces/table-column.interface'

@Component({
  selector: 'app-dash-board-page',
  standalone: true,
  imports: [
    WidgetTableComponent,
    WidgetLargeGoalChartComponent,
    WidgetQuickValueCenterComponent,
  ],
  templateUrl: './dash-board-page.component.html',
  styleUrl: './dash-board-page.component.scss',
})
export class DashBoardPageComponent {
  tableColumns: TableColumn<Order>[] = [
    {
      label: '',
      property: 'status',
      type: 'badge'
    },
    {
      label: 'CLIENTE',
      property: 'name',
      type: 'text'
    },
    {
      label: 'MONTO',
      property: 'price',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'FECHA',
      property: 'timestamp',
      type: 'text',
      cssClasses: ['text-secondary']
    }
  ]
  tableData = tableSalesData
}
