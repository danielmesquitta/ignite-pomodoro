export type StatusColor = 'yellow' | 'red' | 'green'

export interface StatusProps {
  color: StatusColor
}

export interface StatusOption {
  text: string
  color: StatusColor
}
