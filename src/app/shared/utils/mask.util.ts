import { Mask } from '@shared/constants'

export class MaskUtil {
  static maskFormat(mask: Mask): string {
    switch (mask) {
      case 'onlyNumber':
        return '0*'
      case 'number':
        return 'separator.0'
      case 'decimal':
        return 'separator.2'
      case 'decimal4':
        return 'separator.4'
      case 'date':
        return '00-00-0000'
      case 'time':
        return '00:00'
      case 'datetime':
        return '00-00-0000 00:00:00'
      default:
        return ''
    }
  }
}