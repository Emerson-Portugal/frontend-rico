import { Component } from '@angular/core'
import { WidgetQuickValueCenterComponent } from '@shared/third-party/layouts/components/widget-quick-value-center/widget-quick-value-center.component'
import { WidgetTableComponent } from '@shared/third-party/layouts/components/widget-table/widget-table.component'
import { Order, tableSalesData } from '@shared/third-party/static-data/table-sales-data'
import { ApexOptions, VexChartComponent } from '@vex/components/vex-chart/vex-chart.component'
import { TableColumn } from '@vex/interfaces/table-column.interface'
import { createDateArray } from '@vex/utils/create-date-array'
import { defaultChartOptions } from '@vex/utils/default-chart-options'

@Component({
  selector: 'app-dash-board-page',
  standalone: true,
  imports: [
    WidgetQuickValueCenterComponent,
    VexChartComponent,
    WidgetTableComponent,
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
      label: 'PRODUCT',
      property: 'name',
      type: 'text'
    },
    {
      label: '$ PRICE',
      property: 'price',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'DATE',
      property: 'timestamp',
      type: 'text',
      cssClasses: ['text-secondary']
    }
  ]
  tableData = tableSalesData
  series: ApexNonAxisChartSeries | ApexAxisChartSeries = [
    {
      name: 'Sales',
      data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87]
    },
  ]
  options: ApexOptions = defaultChartOptions({
    grid: {
      show: true,
      strokeDashArray: 3,
      padding: {
        left: 16
      }
    },
    chart: {
      type: 'line',
      height: 300,
      sparkline: {
        enabled: false
      },
      zoom: {
        enabled: false
      }
    },
    stroke: {
      width: 4
    },
    labels: createDateArray(12),
    xaxis: {
      type: 'datetime',
      labels: {
        show: true
      }
    },
    yaxis: {
      labels: {
        show: true
      }
    }
  })
}
