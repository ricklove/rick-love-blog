import { SourceNodesArgs } from 'gatsby';

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
