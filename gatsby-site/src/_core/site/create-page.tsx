/* eslint-disable unicorn/consistent-function-scoping */
import React from 'react';
import { SitePageComponent } from '../system/pages';
import { PostIndexPage, PostIndexPageData } from '../pageTemplates/post-index';
import { PostPage, PostPageData } from '../pageTemplates/post';
import { NotFoundPage } from '../pageTemplates/404';

export type PageData = {
    postPage?: PostPageData;
    postIndexPage?: PostIndexPageData;
    notFoundPage?: {};
};

export const createPage = (sitePath: string, data: PageData): SitePageComponent => {
    // Generate Page here => No Node context available, all data must be passed in

    // eslint-disable-next-line no-console
    console.log(`getStaticPage START`, { sitePath, data });

    const { postPage, postIndexPage, notFoundPage } = data;

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
        Component: () => <NotFoundPage data={notFoundPage ?? {}} />,
    };
};
