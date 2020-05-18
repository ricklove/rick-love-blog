/* eslint-disable no-console */
/* eslint-disable unicorn/consistent-function-scoping */
import { SitePages, SitePageInfo } from '../system/pages';
import { processDirectoryFiles, getFilename, readFile } from '../../_system/utils';
import { StaticSitePageData } from './page';

export const getStaticPages = async (): Promise<SitePages<StaticSitePageData>> => {
    // Register Pages here (node api available => Load all data that is needed for all pages here)

    console.log(`getStaticPages START`);

    const createMarkdownPageData = async (filePath: string, kind: 'post' | 'page'): Promise<SitePageInfo<StaticSitePageData>> => {
        const filename = getFilename(filePath);
        const page: SitePageInfo<StaticSitePageData> = {
            sitePath: filename,
            data: {
                markdown: {
                    sourceFilePath: filePath,
                    sourceFileContent: await readFile(filePath),
                },
            },
            // Component: () => <ExamplePage content={filename} />,
        };
        return page;
    };

    const pages = [] as SitePageInfo<StaticSitePageData>[];
    await processDirectoryFiles(`../content/posts`, async x => { pages.push(await createMarkdownPageData(x, `post`)); });
    await processDirectoryFiles(`../content/pages`, async x => { pages.push(await createMarkdownPageData(x, `page`)); });

    pages.push({
        sitePath: `posts`,
        data: {
            indexPage: { posts: pages.map(x => ({ sitePath: x.sitePath, title: x.sitePath })) },
        },
    });

    console.log(`getStaticPages`, { pages });
    return {
        includePagesFolder: true,
        pages,
        // pages: [...new Array(1000)].map((x, i) => ({
        //     sitePath: `test-${i}`,
        //     Component: () => (<ExamplePage index={i} />),
        // })),
    };
};
