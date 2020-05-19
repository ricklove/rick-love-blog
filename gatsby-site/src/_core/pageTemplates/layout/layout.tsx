/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react';
import { Header } from './header';
import * as Store from '../../store';
// import './layout.css';

export const Layout = ({ children }: { children: ReactNode }) => {
    const data = {
        title: Store.site.siteMetadata.title,
        author: Store.site.siteMetadata.author,
        future: Store.methodExample.getFuture(10),
    };

    return (
        <>
            <Header siteTitle={`${data.title ?? ``}`} />
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `0 1.0875rem 1.45rem`,
                }}
            >
                <main>{children}</main>
                <footer>
                    {`© ${new Date().getFullYear()} ${data.author ?? ``}, Built with `}
                    <a href='https://www.gatsbyjs.org'>Gatsby</a>
                    <div>
                        {`Example Method Call Data: ${data.future}`}
                    </div>
                </footer>
            </div>
        </>
    );
};
