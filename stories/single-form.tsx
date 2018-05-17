import React from 'react';
import {storiesOf} from '@storybook/react';
import {createForm} from '../src';

const {Form, Field} = createForm();

storiesOf('Single Form', module).add('Form', () => (
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
        <Field name="hello2" initialValue={'hello2'} />
        <button type="submit"> Submit </button>
    </Form>
));
