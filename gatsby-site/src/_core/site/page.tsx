/* eslint-disable unicorn/consistent-function-scoping */
import React from 'react';
import { SitePageComponent } from '../system/pages';
import { ExamplePage } from './page-example';
import { PostIndexPage } from '../pageTemplates/post-index';
import { PostPage } from '../pageTemplates/post';
import { PageData } from './page-types';

export const getStaticPage = (sitePath: string, data: PageData): SitePageComponent => {
    // Generate Page here => No Node context available, all data must be passed in

    // eslint-disable-next-line no-console
    console.log(`getStaticPage START`, { sitePath, data });

    const { postPage, postIndexPage } = data;

    if (postPage) {
        return {
            Component: () => <PostPage data={postPage} />,
        };
    }
    if (postIndexPage) {
        return {
            Component: () => <PostIndexPage data={postIndexPage} />,
        };
    }

    return {
        Component: () => (
            <ExamplePage title='Unknown' />
        ),
    };

};
