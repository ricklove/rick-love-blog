import React from 'react';
import { SitePages } from '../system/pages';
import { ExamplePage } from './page-example';
import { processDirectoryFiles, getFilename } from '../../_system/utils';

type StaticSitePageInfo = {
    sitePath: string;

    // Custom Data
    markdownSourceFile?: string;
};

export const getStaticPage = (sitePath: string, infoRaw: unknown) => {
    const info = infoRaw as StaticSitePageInfo;


};

export const getStaticPages = async (): Promise<SitePages> => {
    // So we need to register pages here

    const pages = [] as { sitePath: string, Component: () => JSX.Element }[];

    const addMarkdownPage = async (filePath: string, kind: 'post' | 'page') => {
        const filename = getFilename(filePath);
        return {
            sitePath: filename,
            Component: () => <ExamplePage content={filename} />,
        };
    };

    await processDirectoryFiles(`../content/posts`, async x => { await addMarkdownPage(x, `post`); });
    await processDirectoryFiles(`../content/pages`, async x => { await addMarkdownPage(x, `page`); });

    return {
        includePagesFolder: true,
        pages,
        // pages: [...new Array(1000)].map((x, i) => ({
        //     sitePath: `test-${i}`,
        //     Component: () => (<ExamplePage index={i} />),
        // })),
    };
};
