import { PostPageData } from '../pageTemplates/post';
import { PostIndexPageData } from '../pageTemplates/post-index';

export type PageData = {
    postPage?: PostPageData;
    postIndexPage?: PostIndexPageData;
};
