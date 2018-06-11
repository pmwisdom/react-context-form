import React from 'react';
import initialState from './initial-state';
import {
	IFormState,
	IFormProps,
	IProviderFormProps,
	IFieldProps,
	IFormConsumer
} from '../types';
import Form from '../form';
import Field from '../field';

const createFormContext = () => React.createContext(initialState);

const createForm = () => {
	const {Provider, Consumer} = createFormContext();

	const ProviderForm = (props: IProviderFormProps) => {
		return <Form {...props} provider={Provider} />;
	};

	const ConsumerField = (props: IFieldProps) => {
		return (
			<Consumer>
				{(consumerProps: IFormConsumer) => {
					return (
						<Field
							{...consumerProps}
							{...props}
							{...consumerProps.values[props.name]}
							register={consumerProps.registerField}
							name={props.name}
						/>
					);
				}}
			</Consumer>
		);
	};

	return {
		Provider,
		Consumer,
		Form: ProviderForm,
		Field: ConsumerField
	};
};

export default createForm;
