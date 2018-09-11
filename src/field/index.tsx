import React from 'react';
import {IFieldInternalProps, IFieldChildrenProps} from '../types';
import {isFunction} from '../util/func';

class Field extends React.Component<IFieldInternalProps> {
	static defaultProps = {
		value: '',
		initialValue: '',
		type: 'text',
		validators: []
	};

	public componentWillMount() {
		const {initialValue, name, validators} = this.props;
		this.props.register({name, initialValue, validators});
	}

	public handleChange = (
		evtOrValue: React.FormEvent<HTMLInputElement> | any
	) => {
		const {changeFieldValue, name} = this.props;

		if (evtOrValue.currentTarget) {
			return changeFieldValue(name, evtOrValue.currentTarget.value);
		}

		changeFieldValue(name, evtOrValue);
	};

	public handleBlur = () => {
		const {onBlur} = this.props;

		onBlur();
	};

	public handleFocus = () => {};

	public render() {
		const {value, error, type, children, touched} = this.props;

		if (isFunction(children)) {
			return children({
				value,
				onChange: this.handleChange,
				onBlur: this.handleBlur,
				error,
				type,
				touched
			});
		}

		return (
			<input
				value={value}
				type={type}
				onChange={this.handleChange}
				onBlur={this.handleBlur}
				onFocus={this.handleFocus}
			/>
		);
	}
}

export default Field;
