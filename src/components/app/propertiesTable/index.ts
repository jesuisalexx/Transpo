export type RecordType = {
    slug: string,
    label: string,
    value: string,
}

export interface PropertiesTableProps {
    records: RecordType[],
}
