import { Component } from '@angular/core'
import { Contact } from '@shared/third-party/interfaces/contact.interface'
import { WidgetQuickValueCenterComponent } from '@shared/third-party/layouts/components/widget-quick-value-center/widget-quick-value-center.component'
import { WidgetTableComponent } from '@shared/third-party/layouts/components/widget-table/widget-table.component'
import { Order, tableSalesData } from '@shared/third-party/static-data/table-sales-data'
import { TableColumn } from '@vex/interfaces/table-column.interface'

@Component({
  selector: 'app-dash-board-page',
  standalone: true,
  imports: [
    WidgetTableComponent,
    WidgetQuickValueCenterComponent,
  ],
  templateUrl: './dash-board-page.component.html',
  styleUrl: './dash-board-page.component.scss',
})
export class DashBoardPageComponent {
  tableColumns: TableColumn<Order>[] = [
    {
      label: 'SERVICIO N',
      property: 'name',
      type: 'text'
    },
    {
      label: 'CLIENTE',
      property: 'price',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'FECHA',
      property: 'timestamp',
      type: 'text',
      cssClasses: ['text-secondary']
    },
  ]
  smallColumns: TableColumn<Contact>[] = [
    {
      label: 'PATENTE',
      property: 'name',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'CONDUCTOR',
      property: 'price',
      type: 'text',
      cssClasses: ['font-medium']
    },
  ]
  tableData = tableSalesData
}
