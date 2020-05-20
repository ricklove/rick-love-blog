import React from 'react';
import { siteMetadata } from './site/site';
import * as System from './system/system';

// This is a module version that supports rollup 
// const config = {

// };


export const site = { siteMetadata };

export const methodExample = {
    getFuture: (seconds: number) => Date.now() + seconds * 1000,
};


export const { images } = System;


type StoreState = {
    id: string;
    zoom: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = (window ?? {}) as any;
export const getStoreState = () => {
    if (!win.__storeState) {
        const defaultState: StoreState = {
            // eslint-disable-next-line no-bitwise
            id: `${(Math.random() * 1000) | 0}`,
            zoom: 1,
        };
        win.__storeState = defaultState;
        console.log(`getStoreState NO STATE FOUND - Creating Default`);
    }

    console.log(`getStoreState DONE`, { id: win.__storeState.id, storeState: win.__storeState });
    return win.__storeState;
};
