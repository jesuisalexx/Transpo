export type BreadcrumbsType = {
    id: string,
    label: string,
    link: string,
};
export type LanguageOptionsType = {
    value: string,
    icon: string,
};
export interface HeaderProps {
    breadcrumbs: BreadcrumbsType[],
    languageOptions: LanguageOptionsType[],
}
