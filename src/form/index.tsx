import React from 'react';
import {
    IFormState,
    IFormProps,
    IFormConsumer,
    IFormValue,
    IFormValueObject
} from '../types';
import initialState from '../context/initial-state';
import {isFunction} from '../util/func';
import set from '../util/set';

export interface IFieldRegister {
    name: string;
    initialValue: any;
    validators: any;
}

class Form extends React.Component<IFormProps, IFormState> {
    static defaultProps = {
        onChange: () => {},
        onSubmit: () => {},
        onSubmitSuccess: () => {},
        onSubmitFailure: () => {}
    };

    public state = initialState;
    public queue: IFieldRegister[] = [];
    public isProcessingQueue: boolean = false;

    public componentDidUpdate() {
        console.info('[Form Updated]: ', this.state);
    }

    public processQueueFields = () => {
        const field: IFieldRegister | undefined = this.queue.shift();

        if (!field) {
            this.isProcessingQueue = false;
            return;
        }

        const {name, initialValue, validators} = field;

        if (this.state.values[name]) {
            throw new Error(
                `Form Field has already been registered with name ${name}`
            );
        }

        this.setState(
            ({values}) => ({
                values: set(values, name, {
                    value: initialValue,
                    initialValue,
                    touched: false,
                    validators
                }) as IFormValueObject
            }),
            () => {
                this.processQueueFields();
            }
        );
    };

    public registerField = (values: IFieldRegister) => {
        this.queue.push(values);

        if (!this.isProcessingQueue) {
            this.isProcessingQueue = true;
            this.processQueueFields();
        }
    };

    public changeFieldValue = (name: string, value: any) => {
        this.setState(
            ({values}) => ({
                values: this.setFieldValue({
                    values,
                    name,
                    key: 'value',
                    value,
                    touched: true
                })
            }),
            () => this.handleChange()
        );
    };

    public handleChange = () => {
        const {onChange} = this.props;

        if (isFunction(onChange)) {
            onChange(this.state.values);
        }
    };

    public handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const {values} = this.state;
        const {onSubmit, onSubmitSuccess, onSubmitFailure} = this.props;
        try {
            if (isFunction(onSubmit)) {
                const hasError = await this.runValidation();

                if (hasError) {
                    throw new Error(
                        '[Validation Error]' + JSON.stringify(this.fieldErrors)
                    );
                }

                const res = await onSubmit(values);
            }

            if (isFunction(onSubmitSuccess)) {
                onSubmitSuccess(values);
            }
        } catch (err) {
            if (isFunction(onSubmitFailure)) {
                onSubmitFailure(err);
            }
        }
    };

    public get fieldErrors() {
        const {values} = this.state;
        return Object.keys(values).reduce(
            (acc: {[key: string]: string}, key: string) => {
                const error = values[key].error;

                return error ? {...acc, [key]: error} : acc;
            },
            {}
        );
    }

    public async runValidation() {
        const {values} = this.state;
        let hasError = false;
        const updates = [];

        for (const key of Object.keys(values)) {
            const field = values[key];
            if (field.validators && field.validators.length) {
                let fieldError = undefined;

                for (let i = 0; i < field.validators.length; i++) {
                    const validator = field.validators[i];

                    fieldError = validator(field.value);

                    if (fieldError) {
                        hasError = true;
                        break;
                    }
                }

                updates.push(
                    this.updateFieldError({name: key, error: fieldError})
                );
            }
        }

        await Promise.all(updates);

        return hasError;
    }

    public updateFieldError = ({
        name,
        error
    }: {
        name: any;
        error: string | undefined;
    }) => {
        return new Promise(resolve =>
            this.setState(
                ({values}) => ({
                    values: this.setFieldValue({
                        values,
                        name,
                        value: error,
                        key: 'error',
                        touched: true
                    })
                }),
                resolve
            )
        );
    };

    public render() {
        const {provider: Provider, children} = this.props;

        const value: IFormConsumer = {
            ...this.state,
            registerField: this.registerField,
            changeFieldValue: this.changeFieldValue
        };

        return (
            <Provider value={value}>
                <form onSubmit={this.handleSubmit}>{children}</form>
            </Provider>
        );
    }

    private setFieldValue = ({
        values,
        name,
        value,
        key,
        touched
    }: {
        values: any;
        name: string;
        value: any;
        key: string;
        touched?: boolean;
    }): IFormValueObject => {
        const current = values[name];
        const newValue = {...current, [key]: value};

        if (touched) {
            newValue.touched = touched;
        }

        return set(values, `${name}`, newValue) as any;
    };
}

export default Form;
