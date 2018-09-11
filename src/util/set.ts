import setWith from 'lodash.setwith';

const set = (obj: object, path: string, value: any) => {
    return setWith({...obj}, path, value);
};

export default set;
