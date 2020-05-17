import { useState } from 'react';
import { Store, store } from './store';

export function useStaticStore<T>(getData: (store: Store) => T): T
export function useStaticStore<T>(getData: (store: Store) => Promise<T>): undefined | T {

    const [data, setData] = useState(undefined as undefined | T);

    (async () => {
        const d = await getData(store);
        setData(d);
    })();

    return data;
};
