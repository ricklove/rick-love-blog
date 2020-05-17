import { useState } from 'react';
import { Store, store } from './store';
import { delay } from './utils/async';

export function useStaticStore<T>(getData: (store: Store) => T): null | T
export function useStaticStore<T>(getData: (store: Store) => Promise<T>): null | T {
    console.log(`useStaticStore START`);
    const [data, setData] = useState(null as null | T);

    (async () => {

        // Guarantee Async for Test
        await delay(0);
        const d = await getData(store);

        console.log(`useStaticStore Set Data`);
        setData(d);
    })();

    return data;
};
