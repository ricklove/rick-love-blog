import React from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
// import Img from 'gatsby-image';
import * as Store from '../_core/store';

export const Image = () => {

  // This is alot of code just to get an image
  // What advantage does this provide:
  // - Registers that this image will be needed at the maxWidth (at build time)
  // - Which allows the build to generate an optimized image at that size
  // What would be needed to replace this:
  // - A function call that gets an image at the required size
  // - This could be a special function that registers it's parameters at build time
  // - It could check for the optimized size or the original if not generated
  // - So this does provide some interesting optimizations, but could be replaced with this:
  // const useSimple = true;
  // if (useSimple) {
  // This is also closer to native so works like expected with any image, etc.
  const imageUrl = Store.images.getLocalImage(`/images/gatsby-astronaut.png`, { maxWidth: 300 });
  return <img src={imageUrl} alt='That was easy' />;
  // }

  // const data = useStaticQuery(graphql`
  //   query PlaceholderImageStaticQueryOrig {
  //     placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
  //       childImageSharp {
  //         fluid(maxWidth: 300) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `);
  // return <Img fluid={data.placeholderImage?.childImageSharp?.fluid} />;
};
