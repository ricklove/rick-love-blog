/* eslint-disable no-console */
import React from 'react';
import { getStaticPages } from '../_core/site/pages';

const CustomComponentTemplate = ({
    pageContext,
}: {
    pageContext: {
        sitePath: string;
    };
}) => {
    const pages = getStaticPages();
    const { sitePath } = pageContext;
    const page = pages.pages.find(x => x.sitePath === sitePath);
    if (!page) {
        console.error(`CustomComponent not Found`, { sitePath });
        return null;
    }

    const { Component } = page;
    return (<Component />);
};
export default CustomComponentTemplate;
