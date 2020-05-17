/* eslint-disable no-console */
import { SourceNodesArgs } from 'gatsby';
// import { SourceNodesArgs, PreprocessSourceArgs, ParentSpanPluginArgs } from 'gatsby';
// import { resolvePath } from './utils';
// import { watchFilesToGenerateTypeQuery } from './TypeQuery/generate-type-query';

// export const onCreateDevServer = (args: unknown) => {
//   // This runs once for each `gatsby develop` run
//   console.log(`onCreateDevServer START`);
// };

// export const onPreInit = (args: ParentSpanPluginArgs) => {
//   // This runs once for each `gatsby develop` run
//   console.log(`onPreInit START`, { args });
//   // watchFilesToGenerateTypeQuery(resolvePath(`${__dirname}/../`));
// };
// export const onPreExtractQueries = (args: ParentSpanPluginArgs) => {
//   // This runs once for each `gatsby develop` run
//   console.log(`onPreExtractQueries START`);
// };
// export const onCreateNode = (args: ParentSpanPluginArgs) => {
//   // This runs once for each `gatsby develop` run
//   console.log(`onCreateNode START`);
// };
// export const preprocessSource = (args: PreprocessSourceArgs) => {
//   // NOTE: This only runs for files that are preprocessed by Gatsby!!!
//   // This runs once for every file (both initial and after change)
//   console.log(`preprocessSource START`);

//   // const { filename } = args;
//   // generateTypeQuery_onFileChange(filename);
// };


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
