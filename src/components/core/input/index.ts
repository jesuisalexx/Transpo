export enum inputType {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number'
}

export enum inputState {
  PRIMARY = 'primary'
}

export enum inputSize {
  MD = 'md'
}

export interface InputProps {
  modelValue: string | number,
  label?: string,
  placeholder?: string,
  isDisabled?: boolean,
  tabIndex?: number,
  disableTabNavigation?: boolean,
  type?: inputType,
  autocomplete?: string,
  inputmode?: string,
  mask?: string,
  error?: string,
  state?: inputState,
  size?: inputSize,
}
