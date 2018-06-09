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

class Form extends React.Component<IFormProps, IFormState> {
    static defaultProps = {
        onChange: () => {},
        onSubmit: () => {},
        onSubmitSuccess: () => {},
        onSubmitFailure: () => {}
    };

    public state = initialState;

    public registerField = ({
        name,
        initialValue,
        validators
    }: {
        name: string;
        initialValue: any;
        validators: any;
    }) => {
        if (this.state.values[name]) {
            throw new Error(
                `Field has already been registered with name ${name} `
            );
        }

        this.setState(
            ({values}) => ({
                values: {
                    ...values,
                    [name]: {
                        value: initialValue,
                        initialValue,
                        touched: false,
                        validators
                    }
                }
            }),
            () => console.log('REGISTERED', this.state)
        );
    };

    public changeFieldValue = (name: string, value: any) => {
        console.log('Value', value);
        this.setState(
            () => ({
                values: this.setFieldValue({
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
                const hasError = this.runValidation();

                console.log('had error?', hasError);

                if (hasError) {
                    throw new Error('Validation Error');
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

    public runValidation() {
        const {values} = this.state;
        let hasError = false;

        Object.keys(values).map(key => {
            const field = values[key];

            if (field.validators && field.validators.length) {
                for (let i = 0; i < field.validators.length; i++) {
                    const validator = field.validators[i];

                    const error = validator(field.value);

                    if (error) {
                        hasError = true;
                    }

                    this.updateFieldError({name: key, error});
                }
            }
        });

        return hasError;
    }

    public updateFieldError = ({
        name,
        error
    }: {
        name: any;
        error: string | undefined;
    }) => {
        this.setState(() => ({
            values: this.setFieldValue({
                name,
                value: error,
                key: 'error'
            })
        }));
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
        name,
        value,
        key,
        touched
    }: {
        name: string;
        value: any;
        key: string;
        touched?: boolean;
    }) => {
        const {values} = this.state;
        const current = values[name];

        const newValue = {...current, [key]: value};

        if (touched) {
            newValue.touched = touched;
        }

        return {
            ...values,
            [name]: newValue
        };
    };
}

export default Form;
