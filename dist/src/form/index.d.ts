/// <reference types="react" />
import React from 'react';
import { IFormState, IFormProps, IFormConsumer } from '../types';
export interface IFieldRegister {
    name: string;
    initialValue: any;
    validators: any;
}
declare class Form extends React.Component<IFormProps, IFormState> {
    static defaultProps: {
        onChange: () => void;
        onSubmit: () => void;
        onSubmitSuccess: () => void;
        onSubmitFailure: () => void;
    };
    state: IFormConsumer;
    queue: IFieldRegister[];
    isProcessingQueue: boolean;
    componentDidUpdate(): void;
    processQueueFields: () => void;
    registerField: (field: IFieldRegister) => void;
    changeFieldValue: (name: string, value: any) => Promise<void>;
    handleChange: () => void;
    handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleBlur: () => void;
    readonly fieldErrors: {};
    runValidation(): Promise<{}>;
    updateFieldError: ({ name, error }: {
        name: any;
        error: string | undefined;
    }) => Promise<{}>;
    reset: () => Promise<void>;
    setFormValues: (values: {
        [key: string]: any;
    }) => Promise<void>;
    setFieldValue: ({ name, value, key, touched }: {
        name: string;
        value: any;
        key: string;
        touched?: boolean | undefined;
    }) => Promise<{}>;
    render(): JSX.Element;
}
export default Form;
