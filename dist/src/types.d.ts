/// <reference types="react" />
export interface IFormValue {
    value: any;
    initialValue: any;
    touched: boolean;
    error?: string;
    validators?: {
        (value: any): string | undefined;
    }[];
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
    onSubmitSuccess?(values: IFormValueObject): void;
    onSubmitFailure?(error: Error): void;
    onSubmit?(values: IFormValueObject): void;
    onChange?(values: IFormValueObject): void;
    ref?(node: any): void;
    children: any;
}
export interface IFormConsumer extends IFormState {
    registerField({name, initialValue, validators}: {
        name: string;
        initialValue?: any;
        validators?: {
            (value: any): string | undefined;
        }[];
    }): void;
    changeFieldValue(name: string, value: any): void;
    onBlur(): void;
    reset(): void;
    setFormValues(values: {
        [key: string]: any;
    }): void;
}
export interface IFieldInternalProps extends IFieldProps {
    register({name, initialValue, validators}: {
        name: string;
        initialValue?: any;
        validators?: {
            (value: any): string | undefined;
        }[];
    }): void;
    changeFieldValue(name: string, value: any): void;
    onBlur(): void;
}
export interface IFieldChildrenProps {
    touched?: boolean;
    error?: string;
    value?: any;
    type?: any;
    onChange?(evtOrValue?: React.FormEvent<HTMLInputElement> | any): void;
    onBlur?(): void;
}
export interface IFieldProps {
    value?: any;
    initialValue?: any;
    name: string;
    type?: string;
    error?: string;
    touched?: boolean;
    validators?: {
        (value: any): string | undefined;
    }[];
    children?(props: IFieldChildrenProps): any;
}
