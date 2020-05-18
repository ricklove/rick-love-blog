/* eslint-disable unicorn/consistent-function-scoping */
import React from 'react';
import { SitePages, SitePageComponent, SitePageInfo } from '../system/pages';
import { ExamplePage } from './page-example';
import { processDirectoryFiles, getFilename } from '../../_system/utils';

type StaticSitePageData = {
    // Custom Data
    markdownSourceFile?: string;
};

export const getStaticPage = (sitePath: string, data: StaticSitePageData): SitePageComponent => {
    const filename = data.markdownSourceFile ?? ``;

    return {
        Component: () => (
            <ExamplePage content={filename} />
        ),
    };
};

export const getStaticPages = async (): Promise<SitePages<StaticSitePageData>> => {
    // So we need to register pages here


    const createMarkdownPageData = (filePath: string, kind: 'post' | 'page'): SitePageInfo<StaticSitePageData> => {
        const filename = getFilename(filePath);
        const page = {
            sitePath: filename,
            data: {
                markdownSourceFile: filename,
            },
            // Component: () => <ExamplePage content={filename} />,
        };
        return page;
    };

    const pages = [] as SitePageInfo<StaticSitePageData>[];
    await processDirectoryFiles(`../content/posts`, async x => { pages.push(createMarkdownPageData(x, `post`)); });
    await processDirectoryFiles(`../content/pages`, async x => { pages.push(createMarkdownPageData(x, `page`)); });

    return {
        includePagesFolder: true,
        pages,
        // pages: [...new Array(1000)].map((x, i) => ({
        //     sitePath: `test-${i}`,
        //     Component: () => (<ExamplePage index={i} />),
        // })),
    };
};
