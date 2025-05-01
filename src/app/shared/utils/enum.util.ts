import { CustomSelectContent } from '@shared/models'

export class EnumUtil {
  static toCustomSelectContent(obj: { [key: string]: unknown }): CustomSelectContent[] {
    return Object.keys(obj)
      .filter(key => isNaN(Number(key))) 
      .map(key => ({ label: String(obj[key]), value: String(obj[key]) }))
  }
}