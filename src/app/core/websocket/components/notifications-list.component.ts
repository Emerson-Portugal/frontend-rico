// notifications-list.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationsService } from '@core/websocket/services/notifications.service';

@Component({
  selector: 'app-notifications-list',
  template: `
    <div class="notification-panel">
      <h3>🔔 Notificaciones</h3>
      <ul>
        <li *ngFor="let noti of notificationsService.notifications$ | async">
          🕒 {{ noti.timestamp | date:'shortTime' }} — {{ noti.message }}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .notification-panel {
      background: #fff;
      border: 1px solid #ccc;
      padding: 10px;
      max-height: 300px;
      overflow-y: auto;
    }
  `],
  imports: [CommonModule],
standalone: true,
})
export class NotificationsListComponent {
  constructor(public notificationsService: NotificationsService) {}
}
