import React from 'react';
import { SitePages } from '../system/pages';
import { ExamplePage } from './page-example';

export const getStaticPages = (): SitePages => {
    // So we need to register pages here
    return {
        includePagesFolder: true,
        pages: [...new Array(1000)].map((x, i) => ({
            sitePath: `test-${i}`,
            Component: () => (<ExamplePage index={i} />),
        })),
    };
};
