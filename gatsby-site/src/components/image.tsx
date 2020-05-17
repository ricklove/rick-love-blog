import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { usePlaceholderImageStaticQuery } from './image.tsx.gen';
// import { TQGatsbyImage } from '../_system/TypeQuery/built-ins';

// // // External


// // // Ideal
// // export type PlaceholderImageStaticQuery_Ideal = {
// //   placeholderImage?: TQGatsbyImage<'gatsby-astronaut.png', 300>;
// // }


export type PlaceholderImageStaticQuery = {
  placeholderImage?:/* file(relativePath: \\{ eq: "gatsby-astronaut.png" }) */ {
    childImageSharp: {
      fluid/* (maxWidth: 300) */: FluidObject;
    };
  };
}

export const Image = () => {
  const data = useStaticQuery(graphql`
    query PlaceholderImageStaticQueryOrig {
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
  return <Img fluid={data.placeholderImage?.childImageSharp.fluid} />;
};
