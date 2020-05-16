import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { usePlaceholderImageStaticQuery } from './image.tsx.gen';


export type GatsbyImageSharpFluidFragment = FluidObject & {
  /* ...GatsbyImageSharpFluid */
};

export type PlaceholderImageStaticQuery = {
  placeholderImage:/* file(relativePath: { eq: "gatsby-astronaut.png" }) */ {
    childImageSharp: {
      fluid/* (maxWidth: 300) */: GatsbyImageSharpFluidFragment;
    };
  };
}

export const Image = () => {
  const data = useStaticQuery(graphql`
    query PlaceholderImage {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return <Img fluid={data.placeholderImage?.childImageSharp?.fluid} />;
};


export const Image2 = () => {
  const data = usePlaceholderImageStaticQuery();
  return <Img fluid={data.placeholderImage?.childImageSharp?.fluid} />;
};
