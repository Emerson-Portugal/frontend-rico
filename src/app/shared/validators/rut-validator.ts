import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DocumentTypeEnum } from '@shared/constants'

export function DocumentValidatorByDocumentType(documentTypeControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const documentType = documentTypeControl.value
    if (!control.value) return null // Si está vacío, no validamos

    const documentNumber = cleanDocumentNumber(control.value)

    if (documentType === DocumentTypeEnum.RUT) {
      return validateRut(documentNumber)
    } else if (documentType === DocumentTypeEnum.IDENTITYCARD) {
      return validateRun(documentNumber)
    }

    return null
  }
}

function validateRut(rut: string): ValidationErrors | null {
  if (!/^\d{7,8}-[\dKk]$/.test(rut)) {
    return { invalidRut: 'Formato incorrecto. Ejemplo: 12345678-9' }
  }

  const [num, dv] = rut.split('-')
  if (calculateDV(num) !== dv.toUpperCase()) {
    return { invalidRut: 'RUT inválido' }
  }

  return null
}

function validateRun(run: string): ValidationErrors | null {
  if (!/^\d{7,9}-[\dKk]$/.test(run)) {
    return { invalidRun: 'Formato incorrecto. Ejemplo: 12345678-9' }
  }

  const [num, dv] = run.split('-')
  if (calculateDV(num) !== dv.toUpperCase()) {
    return { invalidRun: 'RUN inválido' }
  }

  return null
}

function calculateDV(number: string): string {
  let sum = 0
  let mul = 2

  for (let i = number.length - 1; i >= 0; i--) {
    sum += parseInt(number[i], 10) * mul
    mul = mul === 7 ? 2 : mul + 1
  }

  const remainder = sum % 11
  const dv = 11 - remainder

  return dv === 11 ? '0' : dv === 10 ? 'K' : dv.toString()
}

function cleanDocumentNumber(value: string): string {
  return value.replace(/\./g, '').replace(/\s/g, '').toUpperCase()
}
