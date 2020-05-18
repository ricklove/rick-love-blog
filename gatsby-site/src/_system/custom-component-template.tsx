/* eslint-disable no-console */
import React from 'react';
import { getStaticPage } from '../_core/site/page';
import { SitePageInfo } from '../_core/system/pages';

const CustomComponentTemplate = ({
    pageContext,
}: {
    pageContext: SitePageInfo<unknown>;
}) => {
    const { sitePath, data } = pageContext;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page = getStaticPage(sitePath, data as any);
    if (!page) {
        console.error(`CustomComponent not Found`, { sitePath });
        return null;
    }

    const { Component } = page;
    return (<Component />);
};
export default CustomComponentTemplate;
