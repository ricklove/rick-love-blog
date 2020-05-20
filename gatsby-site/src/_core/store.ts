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


// eslint-disable-next-line import/no-mutable-exports
export let storeState = {
    zoom: 1,
};

export const _setStoreState = (state: typeof storeState) => {
    storeState = state;
};

export const StoreContext = React.createContext(storeState);
