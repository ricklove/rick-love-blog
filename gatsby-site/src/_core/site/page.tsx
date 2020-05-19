/* eslint-disable unicorn/consistent-function-scoping */
import React from 'react';
import { SitePageComponent } from '../system/pages';
import { ExamplePage } from './page-example';
import { Markdown } from '../components/markdown';

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

        // <ExamplePage title={sitePath} content={content} />

        // TODO: Parse Header when Creating Pages (to use path)
        const parts = content.split(`---`);
        const header = parts.slice(1, 1 + 1)[0];
        const headerValues = header?.split(`\n`).map(x => {
            const vParts = x.trim().split(`:`);
            const key = vParts[0];
            const value = vParts.slice(1).join(`:`);
            return { key, value };
        }).filter(x => x.key && x.value) ?? [];
        const contentWithoutHeader = headerValues.length > 0 ? parts.slice(2).join(`---`) : content;

        return {
            Component: () => (
                <>
                    <div style={{ display: `inline-block`, minWidth: `100%`, backgroundColor: `#222222`, color: `#fafafa` }}>
                        <div>{sitePath}</div>
                        <div>
                            {headerValues.map(x => (
                                <div key={x.key} style={{ display: `flex`, flexDirection: `row` }}>
                                    <div style={{ minWidth: `100px` }}>{x.key}</div>
                                    <div style={{}}>{x.value}</div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <Markdown markdown={contentWithoutHeader} />
                        </div>
                    </div>
                </>
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
                            <div key={x.title}>
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
