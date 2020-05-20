import './layout.css';
import './code.css';
import React, { ReactNode } from 'react';
import { Header } from './header';
import * as Store from '../../store';
import { ZoomWrapper } from '../../components/zoom-wrapper';

export const Layout = ({ children }: { children: ReactNode }) => {
    const data = {
        title: Store.site.siteMetadata.title,
        author: Store.site.siteMetadata.author,
        future: Store.methodExample.getFuture(10),
    };

    return (
        <>
            <Store.StoreContext.Consumer>
                {storeState => {
                    Store._setStoreState(storeState);
                    return (
                        <ZoomWrapper>
                            <Header siteTitle={`${data.title ?? ``}`} />
                            <div>
                                <main>{children}</main>
                                <footer>
                                    {`© ${new Date().getFullYear()} ${data.author ?? ``}`}
                                </footer>
                            </div>
                        </ZoomWrapper>
                    );
                }}
            </Store.StoreContext.Consumer>
        </>
    );
};
