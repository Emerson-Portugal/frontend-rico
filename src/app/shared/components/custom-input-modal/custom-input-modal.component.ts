import { ComponentType } from '@angular/cdk/portal'
import { Component, computed, inject, input, output, signal } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { Mask } from '@shared/constants'
import { MaskUtil } from '@shared/utils'
import { NgxMaskDirective } from 'ngx-mask'

@Component({
  selector: 'app-custom-input-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    NgxMaskDirective,
  ],
  templateUrl: './custom-input-modal.component.html',
})
export class CustomInputModalComponent<T> {
  private readonly dialog = inject(MatDialog)

  inputClass = input<string | null>(null, { alias: 'inputClass' })
  disabled = input<boolean>(false)
  leftIcon = input<string | null>(null, { alias: 'icon' })
  placeHolder = input<string | null>(null, { alias: 'placeholder' })
  label = input<string | null>(null)
  isEditable = input<boolean>(false)
  form = input.required<FormGroup>()
  formControlName = input.required<string>({ alias: 'controlName' })
  modal = input.required<ComponentType<unknown>>()
  modalData = input<unknown>()
  value = signal<string>('')
  mask = input<Mask>('text')
  maskFormat = computed<string>(() => MaskUtil.maskFormat(this.mask()))
  getModalResult = output<T>()

  onIconClick() {
    if (this.value()) {
      this.form().get(this.formControlName())?.setValue('')
      return
    }

    this.openModal()
  }

  openModal() {
    const ModalComponent = this.modal()
    if (!ModalComponent) return

    const dialogRef = this.dialog.open(ModalComponent, {
      panelClass: 'vex-dialog-glossy',
      width: '100%',
      maxWidth: '800px',
      minHeight: '500px',
      data: this.modalData(),
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) return

      this.getModalResult.emit(result as T)
    })
  }
}
