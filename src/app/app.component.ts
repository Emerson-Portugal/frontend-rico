import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Subscription } from 'rxjs'
import { NotificationsService } from '@core/websocket/services/notifications.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import {inject, input, OnDestroy, OnInit, output, signal } from '@angular/core'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
//export class AppComponent   { 
export class AppComponent implements OnInit, OnDestroy   { 


  // Suscripción para recibir notificaciones
  private notificationSub: Subscription | undefined;
  private readonly notificationsService = inject(NotificationsService);
  private readonly snackBar = inject(MatSnackBar)
  

  ngOnInit() {
    this.notificationSub = this.notificationsService.notifications$.subscribe(notificationList => {
      const latest = notificationList[0]; // Obtenemos la notificación más reciente

      if (latest) {
        this.snackBar.open(
          `📢 Notificación: ${latest.message || 'Nuevo registro creado'}`,
          'OK',
          { duration: 3000 }
        );
      }
    });

  }

  ngOnDestroy() {
    this.notificationSub?.unsubscribe();
  }



}
