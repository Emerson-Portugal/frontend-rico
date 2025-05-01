import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatButtonModule } from '@angular/material/button'
import { NgIf } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { AuthService } from '@features/auth/services/auth.service'
import { CredentialDto } from '@features/auth/models'

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
})
export class LoginComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)
  private readonly cd = inject(ChangeDetectorRef)
  private readonly snackbar = inject(MatSnackBar)

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })
  inputType = 'password'
  visible = false

  send() {
    const credential: CredentialDto = {
      userName: this.form.get('username')?.value ?? '',
      password: this.form.get('password')?.value ?? '',
    }

    this.authService.login(credential).subscribe({
      next: () => {
        this.router.navigate(['/'])
        this.snackbar.open('Bienvenido!', 'OK', { duration: 3_000 })
      },
    })
  }

  toggleVisibility() {
    this.inputType = this.visible ? 'password' : 'text'
    this.visible = this.inputType === 'text'
    this.cd.markForCheck()
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key !== 'Enter' || this.form.invalid) return

    this.send()
  }
}
