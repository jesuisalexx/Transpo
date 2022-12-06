export enum buttonState {
  PRIMARY = 'primary',
  SUCCESS = 'success',
}
export enum buttonShape {
  RECTANGLE = 'rectangle',
  SQUARE = 'square',
}
export enum buttonIcons {
  ICONBEFORE = '',
  ICONAFTER = '',
}

export interface ButtonProps {
  label?: string,
  state?: buttonState,
  shape?: buttonShape,
  iconBefore?: buttonIcons,
  iconAfter?: buttonIcons,
}
