/// <reference types="react" />
import React from 'react';
import { IProviderFormProps, IFieldProps, IFormConsumer } from '../types';
declare const createForm: () => {
    Provider: React.ComponentType<React.ProviderProps<IFormConsumer>>;
    Consumer: React.ComponentType<React.ConsumerProps<IFormConsumer>>;
    Form: (props: IProviderFormProps) => JSX.Element;
    Field: (props: IFieldProps) => JSX.Element;
};
export default createForm;
