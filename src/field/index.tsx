import React from 'react';
import {IFieldProps} from '../types';

class Field extends React.Component<IFieldProps> {
    public componentWillMount() {
        console.log(this.props.register);
        if (typeof this.props.register === 'function') {
            this.props.register(this.props.name);
        }
    }

    public handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        if (typeof this.props.changeFieldValue === 'function') {
            this.props.changeFieldValue(
                this.props.name,
                evt.currentTarget.value
            );
        }
    };

    public render() {
        const {value: fieldValue} = this.props;

        const value = fieldValue && fieldValue.value;

        return <input value={value} onChange={this.handleChange} />;
    }
}

export default Field;
