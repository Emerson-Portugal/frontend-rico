import { Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  public dialogRef = inject(MatDialogRef<this>)

  title = 'Confirmación de Acción'
  message = '¿Estás seguro de que deseas continuar?'

  onConfirm() {
    this.dialogRef.close(true)
  }
}
