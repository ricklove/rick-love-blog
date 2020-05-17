import { siteMetadata } from './data/site';

export const createStore = () => {
    return {
        site: { siteMetadata },
    };
};

export const store = createStore();
export type Store = typeof store;
