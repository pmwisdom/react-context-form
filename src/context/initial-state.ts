import {IFormState, IFormConsumer} from '../types';

const initialState: IFormConsumer = {
    values: {},
    registerField: name => {
        return name;
    },
    changeFieldValue: (name, value) => {
        return {name, value};
    }
};

export default initialState;
