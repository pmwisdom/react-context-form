import React from 'react';
import {storiesOf} from '@storybook/react';
import {createForm} from '../src';

const {Form, Field} = createForm();

const controlledWithFunc = ({value, onChange}: {value: any; onChange: any}) => {
    return <input value={value} onChange={onChange} />;
};

storiesOf('Nested Field Values', module).add('Form', () => (
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

        <Field name="nested.first" initialValue={'nested.first'} />
        <Field
            name="nested.second"
            type="password"
            initialValue={'nested.second'}
        />

        <Field name="nested2.first" initialValue={'nested2.first'}>
            {({value, onChange}) => {
                return <input value={value} onChange={onChange} />;
            }}
        </Field>
        <Field name="nested2.second" initialValue={'nested2.second'}>
            {controlledWithFunc}
        </Field>

        <Field name="array[0]" initialValue={'array[0]'}>
            {controlledWithFunc}
        </Field>
        <Field name="array[1]" initialValue={'array[1]'}>
            {controlledWithFunc}
        </Field>

        <Field name="arraynest[0].nested" initialValue={'arraynest[0].nested'}>
            {controlledWithFunc}
        </Field>
        <Field
            name="arraynest[0].nested2"
            initialValue={'arraynest[0].nested2'}
        >
            {controlledWithFunc}
        </Field>

        <button type="submit"> Submit </button>
    </Form>
));
