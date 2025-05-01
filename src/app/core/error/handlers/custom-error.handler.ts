import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, NgZone, inject } from '@angular/core'
import { ApiError } from '../models'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandler implements ErrorHandler {
  private readonly zone = inject(NgZone)
  private readonly snackbar = inject(MatSnackBar)

  handleError(error: any): void {
    let messages: string[] = []
    switch (true) {
      case error instanceof Error:
        if (!environment.production) console.warn('Caught by custom error handler: ', error)
        if (/^NG(\d)+/g.test(error.message)) return
        messages.push(error.message)
        break
      case error instanceof HttpErrorResponse && error.status === 400 && error.error.errors?.inputDto?.length > 0:
        if (!environment.production) console.warn(`Caught by custom 400-http-error handler (${error.status}), wrong input type`, error.error.errors)
        messages.push('El tipo de dato ingresado no es el requerido para el recurso. Comunique el error al administrador del sistema.')
        break
      case error instanceof HttpErrorResponse && error.status === 404:
        if (!environment.production) console.warn(`Caught by custom 404-http-error handler (${error.status})`, error.error)
        messages.push('El recurso solicitado no ha sido encontrado. Comunique el error al administrador del sistema.')
        break
      case error instanceof HttpErrorResponse && error.status === 405:
        if (!environment.production) console.warn(`Caught by custom 405-http-error handler (${error.status})`, error.error)
        messages.push('El método HTTP no está permitido para el recurso solicitado. Comunique el error al administrador del sistema.')
        break
      case error instanceof HttpErrorResponse && error.status < 500 && error.status > 0:
        if (!environment.production) console.warn(`Caught by custom 400-http-error handler (${error.status})`, error.error)
        messages = messages.concat((error.error as ApiError)?.messages?.map(m => m.description))
        break
      case error instanceof HttpErrorResponse && (error.status >= 500 || error.status === 0):
        if (!environment.production) console.warn(`Caught by custom 500-http-error handler (${error.status})`, error.error)
        messages.push('Error interno del servidor. Por favor, intente nuevamente.')
        break
      default:
        messages.push('Se encontro un error inesperado. Por favor, intente nuevamente.')
        break
    }
    this.zone.run(() => this.showError(messages))
  }

  private showError(content: string[]): void {
    this.snackbar.open(content.join(', '), 'OK', {
      duration: 3_000,
    })
  }
}
