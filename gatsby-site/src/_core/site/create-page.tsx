/* eslint-disable unicorn/consistent-function-scoping */
import React from 'react';
import { SitePageComponent } from '../system/pages';
import { ExamplePage } from '../pageTemplates/page-example';
import { PostIndexPage, PostIndexPageData } from '../pageTemplates/post-index';
import { PostPage, PostPageData } from '../pageTemplates/post';

export type PageData = {
    postPage?: PostPageData;
    postIndexPage?: PostIndexPageData;
};

export const createPage = (sitePath: string, data: PageData): SitePageComponent => {
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
            <ExamplePage data={{ title: `Unknown Page Data` }} />
        ),
    };

};
