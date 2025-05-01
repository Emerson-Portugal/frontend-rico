import { Mask } from '@shared/constants'

export interface TableColumn<T> {
  label: string
  property: string
  prefix?: string
  suffix?: string
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button'
  visible?: boolean
  cssClasses?: string[]
  pipe?: Mask
}
