import React from 'react';
import {storiesOf} from '@storybook/react';
import {createForm} from '../src';

const Form1 = createForm();
const Form2 = createForm();

storiesOf('Multiple Forms', module).add('Form', () => (
    <div>
        <div>
            Form 1
            <Form1.Form>
                <Form1.Field name="hello" />
                <Form1.Field name="hello2" />
            </Form1.Form>
        </div>
        <div>
            Form 2
            <Form2.Form>
                <Form2.Field name="hello" />
                <Form2.Field name="hello2" />
            </Form2.Form>
        </div>
    </div>
));
