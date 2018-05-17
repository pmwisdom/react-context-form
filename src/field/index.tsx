import React from 'react';
import {IFieldInternalProps} from '../types';

class Field extends React.Component<IFieldInternalProps> {
    static defaultProps = {
        value: '',
        initialValue: ''
    };

    public componentWillMount() {
        const {initialValue, name} = this.props;
        this.props.register(name, initialValue);
    }

    public handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        this.props.changeFieldValue(this.props.name, evt.currentTarget.value);
    };

    public render() {
        const {value: fieldValue} = this.props;

        const value = fieldValue && fieldValue.value;

        return <input value={value} onChange={this.handleChange} />;
    }
}

export default Field;
