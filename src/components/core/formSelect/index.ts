import {
  InputSelectOption,
  selectDropdownPosition,
  selectSize,
  selectState,
} from '@/components/core/select';

export interface FormSelectProps {
  name: string,
  formKey: string,
  label?: string,
  placeholder?: string,
  isDisabled?: boolean,
  tabIndex?: number,
  disableTabNavigation?: boolean,
  options: InputSelectOption[],
  isSearchable?: boolean,
  searchPlaceholder?: string,
  dropdownPosition?: selectDropdownPosition,
  state?: selectState,
  size?: selectSize,
}
