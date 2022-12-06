interface Breadcrumbs {
  id: number,
  label: string,
  handler: any,
}

export interface BreadcrumbsProps {
  items: Breadcrumbs[],
}
