/// <reference types="react" />
import React from 'react';
import { IFieldInternalProps } from '../types';
declare class Field extends React.Component<IFieldInternalProps> {
    static defaultProps: {
        value: string;
        initialValue: string;
        type: string;
        validators: never[];
    };
    componentWillMount(): void;
    handleChange: (evtOrValue: any) => void;
    handleBlur: () => void;
    handleFocus: () => void;
    render(): any;
}
export default Field;
