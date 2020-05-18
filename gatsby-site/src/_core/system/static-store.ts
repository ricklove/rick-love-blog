import { Store } from '../store';

export const evaluateStaticStoreCall = async <T>(store: Store, getData: (store: Store) => T | Promise<T>): Promise<T> => {
    const result = await getData(store);
    return result;
};
