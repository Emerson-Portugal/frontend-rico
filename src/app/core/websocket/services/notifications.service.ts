// services/notifications.service.ts

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { environment } from '@environments/environment';
import { Notification } from '../models';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private socket$: WebSocketSubject<any> | null = null;
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  private newNotificationSubject = new ReplaySubject<Notification>(1); // <- CAMBIO

  notifications$ = this.notificationsSubject.asObservable();
  newNotification$ = this.newNotificationSubject.asObservable(); // <- CAMBIO

  constructor() {
    this.connect();
  }

  private connect() {
    const token = localStorage.getItem('access_token');
    const wsUrl = `${environment.wsBaseUrl}/notificaciones/?token=${token}`;

    this.socket$ = webSocket({
      url: wsUrl,
      deserializer: msg => JSON.parse(msg.data),
      serializer: msg => JSON.stringify(msg),
      openObserver: {
        next: () => console.log('[WS] Conexión abierta'),
      },
      closeObserver: {
        next: () => {
          console.log('[WS] Conexión cerrada');
          this.socket$ = null;
        },
      },
    });

    this.socket$.subscribe(msg => {
      const newNotification: Notification = {
        message: msg.mensaje,
        timestamp: new Date(),
      };

      const current = this.notificationsSubject.getValue();
      this.notificationsSubject.next([newNotification, ...current]);

      // ✅ Notificar a todos los suscriptores
      this.newNotificationSubject.next(newNotification);
    });
  }

  clearNotifications() {
    this.notificationsSubject.next([]);
  }
}
