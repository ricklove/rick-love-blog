// Generated by TypeQuery
import { useStaticQuery, graphql } from 'gatsby';


type SiteTileStaticQuery = {
  site: {
    siteMetadata: {
      title?: string;
      author?: string;
    };
  };
};

export const useSiteTileStaticQuery = (): SiteTileStaticQuery => {
    return useStaticQuery(graphql`
        query SiteTileStaticQuery {
  site {
    siteMetadata {
      title
      author
    }
  }
}
    `);
};
