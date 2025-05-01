import { DatePipe } from '@angular/common'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: unknown): string {
    if (!value) return ''

    switch (typeof value) {
      case 'string':
        let result = ''
        try {
          const date = new Date(value)
          if (date.getUTCHours() > 0 || date.getUTCMinutes() > 0 || date.getUTCSeconds() > 0) {
            result = new DatePipe('en-US').transform(date, 'dd-MM-yyyy HH:mm:ss') || ''
          } else {
            const day = date.getUTCDate().toString().padStart(2, '0')
            const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
            result = `${day}-${month}-${date.getUTCFullYear()}`
          }
        } finally {
          return result
        }
      default:
        return ''
    }
  }
}
