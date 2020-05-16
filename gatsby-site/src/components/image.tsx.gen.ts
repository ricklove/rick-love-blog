// Generated by TypeQuery
import { useStaticQuery, graphql } from 'gatsby';


type PlaceholderImageStaticQuery = {
  placeholderImage/* file(relativePath: { eq: "gatsby-astronaut.png" }) */: {
    childImageSharp: {
      fluid/* (maxWidth: 300) */: {
        // ...GatsbyImageSharpFluid
      };
    };
  };
};

export const usePlaceholderImageStaticQuery = (): PlaceholderImageStaticQuery => {
    return useStaticQuery(graphql`
        query PlaceholderImageStaticQuery {
  placeholderImage/* file(relativePath { eq
    }
  }
}
    `);
};
