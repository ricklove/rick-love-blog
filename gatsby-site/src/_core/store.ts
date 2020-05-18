import { siteMetadata } from './data/site';

// This is a module version that supports rollup 
// const config = {

// };


export const site = { siteMetadata };

export const methodExample = {
    getFuture: (seconds: number) => Date.now() + seconds * 1000,
};

export const images = {
    getLocalImage: (path: string, options: { maxWidth: number }) => {
        // TODO: Register image usage at build time
        // - Build optimized size
        // - Return optimized size if available (at runtime)
        return path;
    },
};
