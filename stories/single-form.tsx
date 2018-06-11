import React from 'react';
import {storiesOf} from '@storybook/react';
import {createForm} from '../src';

const {Form, Field} = createForm();

const controlledWithFunc = ({value, onChange}: {value: any; onChange: any}) => {
    return <input value={value} onChange={onChange} />;
};

storiesOf('Single Form', module)
    .add('Form', () => (
        <Form
            onChange={values => console.log('Values changed', values)}
            onSubmit={values => {
                console.log('Submitted with', values);
                throw new Error('Fail');
            }}
            onSubmitSuccess={values =>
                console.log('Submitted succesfully with', values)
            }
            onSubmitFailure={err => console.error('Submit failed because', err)}
        >
            <Field name="hello" initialValue={'hello1'} />
            <Field name="password" type="password" initialValue={'hello2'} />
            <Field name="controlled" initialValue={'hello2'}>
                {({value, onChange}) => {
                    return <input value={value} onChange={onChange} />;
                }}
            </Field>
            <Field name="controlled-2" initialValue={'hello3'}>
                {controlledWithFunc}
            </Field>

            <button type="submit"> Submit </button>
        </Form>
    ))
    .add('Throws Error on duplicate fields', () => (
        <Form>
            <Field name="dupe" />
            <Field name="dupe" />
        </Form>
    ));
