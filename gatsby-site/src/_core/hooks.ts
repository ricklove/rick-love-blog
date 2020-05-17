/* eslint-disable no-console */
import { useState } from 'react';
import { Store, store } from './store';
import { delay } from './utils/async';

// TODO: This call will be replaced by a data object at build time

export function useStaticStore<T>(prototypeData: T, getData: (store: Store) => T | Promise<T>): T {
    console.log(`useStaticStore START`);
    const [data, setData] = useState(prototypeData);

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
