import { Component, inject, signal } from '@angular/core'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MachineService } from '../../services'
import { CustomBehaviourEnum, EditViewModeEnum, ModalViewMode } from '@shared/constants'
import {MachineDto } from '../../models'
import { MachineListComponent } from '../machine-list/machine-list.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-machine-modal',
  standalone: true,
  imports: [MachineListComponent, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './machine-modal.component.html',
  styles: ``
})
export class MachineModalComponent {
  public dialogRef = inject(MatDialogRef<this>)
  private readonly machineService = inject(MachineService)

  title = 'Tipo de Maquina'
  EditViewModeEnum = EditViewModeEnum
  CustomBehaviourEnum = CustomBehaviourEnum
  viewMode = signal<ModalViewMode>('list')

  onSelectElement(machine: MachineDto) {
    this.dialogRef.close(machine)
  }

  getMachineByCode(code: string) {
    this.machineService.getByCode(code).subscribe({
      next: ({ data }) => this.dialogRef.close(data),
    })
  }

  toggleViewMode() {
    this.viewMode.set('list')
  }
}
