import React from 'react';
import {storiesOf} from '@storybook/react';
import {createForm} from '../src';

const {Form, Field} = createForm();

const required = (value: any) => (!value ? 'This is required' : undefined);

const minLength = (value: any) =>
    value.length < 5 ? 'Value must be longer than 5 characters' : undefined;

const InputWithError: React.SFC<any> = ({error, touched, ...rest}) => {
    console.log('Error', error, touched);
    return (
        <div>
            <input {...rest} />
            {touched && error ? (
                <div style={{color: 'red'}}>{error}</div>
            ) : null}
        </div>
    );
};

storiesOf('Validation', module).add('validation', () => (
    <Form
        onChange={values => console.log('Values changed', values)}
        onSubmit={values => {
            console.log('Submitted with', values);
        }}
        onSubmitSuccess={values =>
            console.log('Submitted succesfully with', values)
        }
        onSubmitFailure={err => console.error('Submit failed because', err)}
    >
        <Field name="validation" validators={[required]}>
            {InputWithError}
        </Field>
        <Field name="validation-password" validators={[minLength]}>
            {InputWithError}
        </Field>
        <Field name="multiple-validators" validators={[required, minLength]}>
            {InputWithError}
        </Field>
        <button type="submit"> Submit </button>
    </Form>
));
