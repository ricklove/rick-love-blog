/* eslint-disable no-console */
import { SourceNodesArgs, PreprocessSourceArgs, ParentSpanPluginArgs } from 'gatsby';
import { writeFile } from './utils';
import { generateTypeQuery } from './TypeQuery/generate-type-query';

export const onPreInit = (args: ParentSpanPluginArgs) => {
  // This runs once for each `gatsby develop` run
  // console.log(`onPreInit START`, { args });
};
export const onPreExtractQueries = (args: ParentSpanPluginArgs) => {
  // This runs once for each `gatsby develop` run
  // console.log(`onPreExtractQueries START`, { args });
};
export const preprocessSource = (args: PreprocessSourceArgs) => {
  // NOTE: This only runs for files that are preprocessed by Gatsby!!!
  // This runs once for every file (both initial and after change)
  // console.log(`preprocessSource START`, { args });

  const { filename } = args;

  if (filename.endsWith(`.tsx`)) {
    console.log(`preprocessSource START`, { filename });

    const gen = generateTypeQuery(filename);
    if (gen) {
      console.log(`preprocessSource END`, { filename });
      writeFile(`${filename}.gen.ts`, gen);
    }
  }
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
