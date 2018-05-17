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
    public state = initialState;

    public registerField = (name: string) => {
        if (this.state.values[name]) {
            throw new Error(
                `Field has already been registered with name ${name} `
            );
        }

        this.setState(
            ({values}) => ({
                values: {
                    ...values,
                    [name]: {value: '', initialValue: ''}
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
            () => console.log('Changed', this.state)
        );
    };

    public render() {
        const {provider: Provider, children} = this.props;

        const value: IFormConsumer = {
            ...this.state,
            registerField: this.registerField,
            changeFieldValue: this.changeFieldValue
        };

        return <Provider value={value}>{children}</Provider>;
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

        console.log({
            ...values,
            [name]: {...current, [key]: value}
        });

        return {
            ...values,
            [name]: {...current, [key]: value}
        };
    }
}

export default Form;
