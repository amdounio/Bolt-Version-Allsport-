export interface FormField {
    fieldName: string;
    value: any;
    validators?: any[];
    attributes?: any;
    type?: string;
    disabled?: boolean;
    displayText?: string;
    section?: number,
    order?: number
}
