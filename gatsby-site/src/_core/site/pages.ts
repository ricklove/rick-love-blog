import { SitePages } from '../system/pages';
import { ExamplePage } from './page-example';

export const getStaticPages = (): SitePages => {
    // So we need to register pages here
    return {
        includePagesFolder: true,
        pages: [{
            sitePath: `test`,
            Component: ExamplePage,
        }],
    };
};
