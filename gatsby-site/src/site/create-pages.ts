import { paginate } from 'gatsby-awesome-pagination';
import { CreatePagesArgs, SourceNodesArgs, NodeInput } from 'gatsby';
import path from 'path';
import { Settings } from './settings';
import { toKebabCase } from '../utils/utils';

const pageTemplate = path.resolve(`../templates/page.tsx`);
const indexTemplate = path.resolve(`../templates/index.tsx`);
const tagsTemplate = path.resolve(`../templates/tags.tsx`);


const pageTypeRegex = /src\/(.*?)\//;
const getType = (node: GatsbyTypes.MarkdownRemark) => node?.fileAbsolutePath?.match(pageTypeRegex)?.[1];


export const createPages = async ({ actions, graphql, getNodes }: CreatePagesArgs) => {
  const { createPage } = actions;
  const allNodes = getNodes() as (NodeInput & { fileAbsolutePath: string })[];

  // eslint-disable-next-line @typescript-eslint/camelcase
  const result = await graphql<GatsbyTypes.Query, GatsbyTypes.Query_allMarkdownRemarkArgs>(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              tags
            }
            fileAbsolutePath
          }
        }
      }
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const markdownPages = [...result.data?.allMarkdownRemark?.edges ?? []];
  // const siteMetadata = result.data?.site;

  const sortedPages = markdownPages?.sort((pageA, pageB) => {
    const typeA = getType(pageA.node) ?? ``;
    const typeB = getType(pageB.node) ?? ``;
    return typeA.localeCompare(typeB);
  });

  const posts = allNodes.filter(({ internal, fileAbsolutePath }) => internal.type === `MarkdownRemark` && fileAbsolutePath.includes(`/posts/`)) as unknown[] as (GatsbyTypes.MarkdownRemark & { frontMatter?: { tags: string[] } })[];

  // Create posts index with pagination
  paginate({
    createPage,
    items: posts,
    component: indexTemplate,
    itemsPerPage: Settings.postsPerPage,
    pathPrefix: `/`,
  });

  // Create each markdown page and post
  sortedPages.forEach((page, index) => {
    const n = page.node;
    if (!n) { return; }

    const previous = index === 0 ? undefined : sortedPages[index - 1].node;
    const next = index === sortedPages.length - 1 ? undefined : sortedPages[index + 1].node;
    const isNextSameType = getType(n) === (next && getType(next));
    const isPreviousSameType = getType(n) === (previous && getType(previous));
    createPage({
      path: n.frontmatter?.path ?? ``,
      component: pageTemplate,
      context: {
        type: getType(n),
        next: isNextSameType ? next : undefined,
        previous: isPreviousSameType ? previous : undefined,
      },
    });
  });

  // Create tag pages
  const tags = [...new Set(posts.flatMap(post => (post.frontmatter as unknown as { tags: string[] })?.tags).filter(x => x))];
  tags.forEach(tag => {
    const postsWithTag = posts.filter((post) => (post.frontmatter as unknown as { tags: string[] })?.tags.includes(tag));
    paginate({
      createPage,
      items: postsWithTag,
      component: tagsTemplate,
      itemsPerPage: Settings.postsPerPage,
      pathPrefix: `/tag/${toKebabCase(tag)}`,
      context: {
        tag,
      },
    });
  });

  return {
    sortedPages,
    tags,
  };
};

export const sourceNodes = ({ actions }: SourceNodesArgs) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }

    type Frontmatter {
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
