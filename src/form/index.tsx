import React from 'react';
import {
    IFormState,
    IFormProps,
    IFormConsumer,
    IFormValue,
    IFormValueObject
} from '../types';
import initialState from '../context/initial-state';

class Form extends React.Component<IFormProps, IFormState> {
    static defaultProps = {
        onChange: () => {},
        onSubmit: () => {},
        onSubmitSuccess: () => {},
        onSubmitFailure: () => {}
    };

    public state = initialState;

    public registerField = (name: string, initialValue: any) => {
        if (this.state.values[name]) {
            throw new Error(
                `Field has already been registered with name ${name} `
            );
        }

        this.setState(
            ({values}) => ({
                values: {
                    ...values,
                    [name]: {value: initialValue, initialValue}
                }
            }),
            () => console.log('REGISTERED', this.state)
        );
    };

    public changeFieldValue = (name: string, value: any) => {
        console.log('Value', value);
        this.setState(
            ({values}) => ({
                values: this.setFieldValue({name, key: 'value', value, values})
            }),
            () => this.handleChange()
        );
    };

    public handleChange = () => {
        const {onChange} = this.props;

        if (typeof onChange === 'function') {
            onChange(this.state.values);
        }
    };

    public handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const {values} = this.state;
        const {onSubmit, onSubmitSuccess, onSubmitFailure} = this.props;
        try {
            if (typeof onSubmit === 'function') {
                const res = await onSubmit(values);
            }

            if (typeof onSubmitSuccess === 'function') {
                onSubmitSuccess(values);
            }
        } catch (err) {
            if (typeof onSubmitFailure === 'function') {
                onSubmitFailure(err);
            }
        }
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

    private setFieldValue({
        name,
        value,
        values,
        key
    }: {
        name: string;
        value: any;
        values: IFormValueObject;
        key: string;
    }) {
        const current = values[name];

        return {
            ...values,
            [name]: {...current, [key]: value}
        };
    }
}

export default Form;
