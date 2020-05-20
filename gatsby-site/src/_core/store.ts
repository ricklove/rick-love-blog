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
