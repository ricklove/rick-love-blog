/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React, { ReactNode } from 'react';
import { graphql } from 'gatsby';
import { Header } from './header';
import './layout.css';
import { useSiteTileStaticQuery } from './layout.tsx.gen';

// Keep graphQl in imports or it will stop processing this file
export const gql2 = graphql;
export type SiteTileStaticQuery = {
  site: {
    siteMetadata: {
      title?: string;
      author?: string;
    };
  };
};

export const Layout = ({ children }: { children: ReactNode }) => {
  const data = useSiteTileStaticQuery();

  return (
    <>
      <Header siteTitle={`${data.site.siteMetadata.title ?? ``}`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          {`© ${new Date().getFullYear()} ${data.site.siteMetadata.author ?? ``}, Built with `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </footer>
      </div>
    </>
  );
};
