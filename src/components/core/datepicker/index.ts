export enum MonthNameType {
    LONG = 'long',
    SHORT = 'short',
}
export interface DatepickerProps {
    label?: string,
    range?: boolean,
    inline?: boolean,
    multiDates?: boolean,
    monthNameFormat?: MonthNameType,
    modelValue?: any,
    placeholder?: string,
    noToday?: boolean,
    enableTimePicker?: boolean,
    autoApply?: boolean,
    timePicker?: boolean,
    locale?: string,
    isDisabled?: boolean,
}
