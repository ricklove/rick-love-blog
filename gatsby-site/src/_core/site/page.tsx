/* eslint-disable unicorn/consistent-function-scoping */
import React from 'react';
import { SitePageComponent } from '../system/pages';
import { ExamplePage } from './page-example';

export type StaticSitePageData = {
    // Custom Data
    markdown?: {
        sourceFilePath: string;
        sourceFileContent: string;
    };

    indexPage?: {
        posts: { sitePath: string, title: string }[];
    };
};

export const getStaticPage = (sitePath: string, data: StaticSitePageData): SitePageComponent => {
    // Generate Page here => No Node context available, all data must be passed in

    // eslint-disable-next-line no-console
    console.log(`getStaticPage START`, { sitePath, data });

    // const filename = data.markdown?.sourceFilePath ?? ``;
    if (data.markdown) {
        const content = data.markdown?.sourceFileContent ?? ``;

        return {
            Component: () => (
                <ExamplePage title={sitePath} content={content} />
            ),
        };
    }
    if (data.indexPage) {
        return {
            Component: () => (
                <>
                    <div>Posts: </div>
                    <div>
                        {data.indexPage?.posts.map(x => (
                            <div>
                                <a href={x.sitePath}>{x.title}</a>
                            </div>
                        ))}
                    </div>
                </>
            ),
        };
    }

    return {
        Component: () => (
            <ExamplePage title='Unknown' />
        ),
    };

};
