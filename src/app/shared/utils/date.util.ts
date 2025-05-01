import { RegexPatterns } from '@shared/constants'

export class DateUtil {
  static toString(date: Date | string | null | undefined): string {
    if (!date) return ''

    switch (typeof date) {
      case 'string':
        return date as string
      case 'object':
        const dateObject = date as Date
        const year = dateObject.getFullYear()
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
        const day = dateObject.getDate().toString().padStart(2, '0')
        return `${year}-${month}-${day}`
      default:
        return ''
    }
  }

  static toDate(date: string): Date | null {
    if (!date) return null

    const [year, month, day] = date.substring(0, 10).split('-').map(Number)
    return new Date(year, month - 1, day, 0, 0, 0, 0)
  }

  static fromDMYtoYMD(date: string): string {
    const splitChar = date.includes('/') ? '/' : '-'
    const [day, month, year] = date.split(splitChar)
    if (day?.length == 2 && month?.length == 2 && year?.length == 4) return `${year}-${month}-${day}`
    return date
  }

  static isExpectedDateFormat(date: string): boolean {
    return RegexPatterns.DATE.test(date)
  }
}