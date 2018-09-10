import setWith from 'lodash.setwith';
import curry from 'lodash.curry';

const set = curry((obj: object, path: string, value: any) => {
    return setWith({...obj}, path, value);
});

export default set;
