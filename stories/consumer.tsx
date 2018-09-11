import React from 'react';
import {storiesOf} from '@storybook/react';
import {createForm} from '../src';
import {IFormConsumer} from '../src/types';

const {Form, Field, Consumer} = createForm();

storiesOf('Form Consumer (Triggering custom actions)', module).add(
	'Consumer',
	() => (
		<Form>
			<Field name="field" initialValue={'Initial Value'} />
			<Consumer>
				{({reset, setFormValues}: IFormConsumer) => (
					<div>
						<button onClick={reset}>
							Click me to reset form to initial state
						</button>

						<button
							onClick={() =>
								setFormValues({field: 'Custom Value'})
							}
						>
							Click me to set field manually
						</button>
					</div>
				)}
			</Consumer>
		</Form>
	)
);
