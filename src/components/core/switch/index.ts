export enum SwitchType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}
export interface SwitchProps {
    modelValue?: boolean,
    label?: string,
    isDisabled?: boolean,
    type?: SwitchType,
}
