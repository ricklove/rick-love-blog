/* eslint-disable no-console */
import { SourceNodesArgs } from 'gatsby';

export const onPreInit = () => {
  // This runs once for each `gatsby develop` run
  console.log(`onPreInit START`);
};
export const onPreExtractQueries = () => {
  // This runs once for each `gatsby develop` run
  console.log(`onPreExtractQueries START`);
};
export const preprocessSource = () => {
  // This runs once for every file (both initial and after change)
  console.log(`preprocessSource START`);
};


export const sourceNodes = ({ actions }: SourceNodesArgs) => {
  const { createTypes } = actions;
  const typeDefs = `
        type MarkdownRemark implements Node {
          frontmatter: Frontmatter!
        }
    
        type Frontmatter {
          test: String!
          title: String!
          author: String
          date: Date! @dateformat
          path: String!
          tags: [String!]
          excerpt: String
          coverImage: File @fileByRelativePath
        }
      `;
  createTypes(typeDefs);
};
