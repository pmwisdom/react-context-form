import React from 'react';
import {storiesOf} from '@storybook/react';
import {createForm} from '../src';

const {Form, Field} = createForm();

storiesOf('Single Form', module).add('Form', () => (
    <Form>
        <Field name="hello" />
        <Field name="hello2" />
    </Form>
));
