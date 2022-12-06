import { inputSize, inputState, inputType } from '@/components/core/input';

export interface FormInputProps {
  name: string,
  formKey: string,
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
