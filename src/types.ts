export interface IFormValue {
    value: any;
    initialValue: any;
}

export interface IFormValueObject {
    [key: string]: IFormValue;
}

export interface IFormState {
    values: IFormValueObject;
}

export interface IFormProps extends IProviderFormProps {
    provider: React.Provider<any>;
}

export interface IProviderFormProps {
    onChange?(values: IFormValueObject): void;
    children: any;
}

export interface IFormConsumer extends IFormState {
    registerField?(name: string): void;
    changeFieldValue?(name: string, value: any): void;
}

export interface IFieldProps {
    register?(name: string): void;
    changeFieldValue?(name: string, value: any): void;
    value?: any;
    name: string;
}
