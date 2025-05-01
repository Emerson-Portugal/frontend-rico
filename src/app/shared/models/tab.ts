export interface Tab {
  label: string
  onClick: (...args: never[]) => void
  active: boolean
  disabled: boolean
}
