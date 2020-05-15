import React from "react";
import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";
import { SEO } from "../components/seo";
import { Layout } from "../components/layout";
import { Post } from "../components/post";

export const BlogPostTemplate = ({
  data,
  pageContext,
}: {
  data: unknown;
  pageContext?: {
    next?: unknown;
    previous?: unknown;
  };
}) => {
  const {
    frontmatter: { title, date, path, author, coverImage, excerpt, tags },
    excerpt: autoExcerpt,
    id,
    html,
  } = data.markdownRemark;
  const { next, previous } = pageContext;
  return (
    <Layout>
      <SEO title={title} description={excerpt || autoExcerpt} />
      <Post
        key={id}
        title={title}
        date={date}
        path={path}
        author={author}
        coverImage={coverImage}
        html={html}
        tags={tags}
        previousPost={previous}
        nextPost={next}
      />
    </Layout>
  );
};

export type PageQueryResult = {
  markdownRemark: {
    id: string;
    html: string;
    excerpt: string;
    frontmatter: {
      title: string;
      date: string;
      path: string;
      author: string;
      excerpt: string;
      tags: string[];
      coverImage: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
};
export const pageQuery = graphql`
  query($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        path
        author
        excerpt
        tags
        coverImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      id
      html
      excerpt
    }
  }
`;
