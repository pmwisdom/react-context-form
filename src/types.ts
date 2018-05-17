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
    onSubmitSuccess?(values: IFormValueObject): void;
    onSubmitFailure?(error: Error): void;
    onSubmit?(values: IFormValueObject): void;
    onChange?(values: IFormValueObject): void;
    children: any;
}

export interface IFormConsumer extends IFormState {
    registerField(name: string, initialValue?: any): void;
    changeFieldValue(name: string, value: any): void;
}

export interface IFieldInternalProps extends IFieldProps {
    register(name: string, initalValue?: any): void;
    changeFieldValue(name: string, value: any): void;
}

export interface IFieldProps {
    value?: any;
    initialValue?: any;
    name: string;
}
