import React from 'react';
import {storiesOf} from '@storybook/react';
import {createForm} from '../src';

const {Form, Field} = createForm();

const required = (value: any) => (!value ? 'This is required' : undefined);

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
        <Field name="hello" validators={[required]} initialValue={'hello1'} />
        <Field name="password" type="password" initialValue={'hello2'} />
        <Field name="controlled" initialValue={'hello2'}>
            {({value, onChange}) => {
                return <input value={value} onChange={onChange} />;
            }}
        </Field>
        <button type="submit"> Submit </button>
    </Form>
));
