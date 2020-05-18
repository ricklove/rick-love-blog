/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react';
import { Header } from './header';
import './layout.css';
import * as Store from '../_core/store';

// export const staticData = null as any;

export const Layout = ({ children }: { children: ReactNode }) => {

  // This offers essentially no benefit.
  // - The data is already static data (just in another file) 
  // - A reference to the static data with a rollup process would easily include it:
  // - It isn't possible to pass any variables, so that has no gain
  //   - Since this is limited to non-parameter data, it is nothing really
  // - Calling whatever method to get the data would cache it just the same
  // - The only possible benefit would be to cache the data (so it isn't re-calculated each render, but that is easy to do with memoization if actually desired)
  //   - And without that, it is possible to refresh the data at runtime even with the cached build time copy (which isn't possible with static)
  // - Using a parameter based call could be cached at build time according to context without a problem

  // A Store Module Version
  const data = {
    title: Store.site.siteMetadata.title,
    author: Store.site.siteMetadata.author,
    future: Store.methodExample.getFuture(10),
  };

  // This will only run client side (not processed by Gatsby)
  // TODO: Process this at build time
  // Must provide defaults (when store is null)

  // // This could inject data in-situ (i.e. it stores data here during build - so it is always visible)
  // const data = useStaticStore(staticData ?? {
  //   title: ``,
  //   author: ``,
  // }, s => s.site.siteMetadata);

  console.log(`Layout RENDER`, { data });
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
          {`Test: ${data.future}`}
        </footer>
      </div>
    </>
  );
};
