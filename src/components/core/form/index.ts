import type { BaseSchema } from 'yup';

export enum touchTrigger {
  BLUR = 'blur',
  FOCUS = 'focus',
  INPUT = 'input'
}

export type DefaultFormKey = 'default';

export interface FormProps {
  formKey: string;
  modelValue: Record<any, any>,
  validationSchema: BaseSchema;
  permanent?: boolean,
  touchBy?: touchTrigger,
  submitOnEnter: boolean,
}
