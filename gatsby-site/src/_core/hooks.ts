/* eslint-disable no-console */
import { useState } from 'react';
import { Store, store } from './store';
import { delay } from './utils/async';

// TODO: This call will be replaced by a data object at build time

// Without async, the return type should be T, but for now, allow null | T
export function useStaticStore<T>(getData: (store: Store) => T): null | T
export function useStaticStore<T>(getData: (store: Store) => Promise<T>): null | T {
    console.log(`useStaticStore START`);
    const [data, setData] = useState(null as null | T);

    (async () => {

        // Guarantee Async for Test
        await delay(0);
        const d = await getData(store);

        console.log(`useStaticStore Set Data`);

        // TEMP: Stop render loop - This needs to be handled better
        if (JSON.stringify(data) !== JSON.stringify(d)) {
            setData(d);
        }
    })();

    return data;
};
