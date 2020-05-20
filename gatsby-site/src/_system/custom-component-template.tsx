/* eslint-disable no-console */
import React from 'react';
import { createPage } from '../_core/site/create-page';
import { SitePageInfo } from '../_core/system/pages';

const CustomComponentTemplate = ({
    pageContext,
}: {
    pageContext: SitePageInfo<unknown>;
}) => {
    const { sitePath, data } = pageContext;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page = createPage(sitePath, data as any);
    if (!page) {
        console.error(`CustomComponent not Found`, { sitePath });
        return null;
    }

    const { Component } = page;
    return (<Component />);
};
export default CustomComponentTemplate;
