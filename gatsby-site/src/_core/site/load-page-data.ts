/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-console */
/* eslint-disable unicorn/consistent-function-scoping */
import { SitePages, SitePageInfo } from '../system/pages';
import { processDirectoryFiles, getFilename, readFile } from '../utils/files';
import { PageData } from './create-page';

export const loadPageData = async (): Promise<SitePages<PageData>> => {
    // Register Pages here (node api available => Load all data that is needed for all pages here)

    console.log(`loadStaticPages START`);

    const createPageData_fromMarkdownFile = async (filePath: string, kind: 'post' | 'page'): Promise<SitePageInfo<PageData>> => {

        const filename = getFilename(filePath);
        const content = await readFile(filePath);

        // TODO: Parse Header when Creating Pages (to use path)
        const parts = content.split(`---`);
        const header = parts.slice(1, 1 + 1)[0];
        const headerValues = header?.split(`\n`).map(x => {
            const vParts = x.trim().split(`:`);
            const key = vParts[0];
            const value = vParts.slice(1).join(`:`);
            const valueNoQuotes = value.replace(/^\s*"/g, ``).replace(/"\s*$/g, ``);
            return { key, value: valueNoQuotes };
        }).filter(x => x.key && x.value) ?? [];
        const contentWithoutHeader = headerValues.length > 0 ? parts.slice(2).join(`---`) : content;

        const sitePath = `/${headerValues.find(x => x.key === `path`)?.value.replace(/^\//g, ``) ?? filename.replace(/\.md$/, ``)}`;
        const summary = `${contentWithoutHeader.split(`\`\`\``)[0].split(`\n`).slice(0, 16).join(`\n`).trim()}\n\n...`;
        const title = headerValues.find(x => x.key === `title`)?.value ?? sitePath;

        console.log(`createPageData`, { sitePath });
        const page: SitePageInfo<PageData> = {
            sitePath,
            data: {
                postPage: {
                    sourceFilePath: filePath,
                    sourceFileContent: content,
                    title,
                    headers: headerValues,
                    body: contentWithoutHeader,
                    summary,
                },
            },
        };
        return page;
    };

    const pages = [] as SitePageInfo<PageData>[];
    await processDirectoryFiles(`../content/posts`, async x => { if (x.endsWith(`.md`)) { pages.push(await createPageData_fromMarkdownFile(x, `post`)); } });
    await processDirectoryFiles(`../content/pages`, async x => { if (x.endsWith(`.md`)) { pages.push(await createPageData_fromMarkdownFile(x, `page`)); } });


    pages.push({
        sitePath: `/`,
        data: {
            postIndexPage: {
                posts: pages.map(x => ({
                    sitePath: x.sitePath,
                    title: x.data.postPage?.title ?? ``,
                    summary: x.data.postPage?.summary ?? ``,
                })),
            },
        },
    });

    pages.push({
        sitePath: `/404.html`,
        data: {
            notFoundPage: {},
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
