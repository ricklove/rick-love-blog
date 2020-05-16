import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Header } from './header';
import './layout.css';


// Copy of Generated Types

// type MarkdownRemark = Node & {
//     readonly id: Scalars['ID'];
//     readonly frontmatter: Frontmatter;
//     readonly excerpt: Maybe<Scalars['String']>;
//     readonly rawMarkdownBody: Maybe<Scalars['String']>;
//     readonly fileAbsolutePath: Maybe<Scalars['String']>;
//     readonly html: Maybe<Scalars['String']>;
//     readonly htmlAst: Maybe<Scalars['JSON']>;
//     readonly excerptAst: Maybe<Scalars['JSON']>;
//     readonly headings: Maybe<ReadonlyArray<Maybe<MarkdownHeading>>>;
//     readonly timeToRead: Maybe<Scalars['Int']>;
//     readonly tableOfContents: Maybe<Scalars['String']>;
//     readonly wordCount: Maybe<MarkdownWordCount>;
//     readonly parent: Maybe<Node>;
//     readonly children: ReadonlyArray<Node>;
//     readonly internal: Internal;
// };

// type Frontmatter = {
//     readonly title: Scalars['String'];
//     readonly author: Maybe<Scalars['String']>;
//     readonly date: Scalars['Date'];
//     readonly path: Scalars['String'];
//     readonly tags: Maybe<ReadonlyArray<Scalars['String']>>;
//     readonly excerpt: Maybe<Scalars['String']>;
//     readonly coverImage: Maybe<File>;
// };

// type BlogPostTemplateQ2Query = { readonly markdownRemark: Maybe<(
//     Pick<MarkdownRemark, 'id' | 'html' | 'excerpt'>
//     & { readonly frontmatter: (
//       Pick<Frontmatter, 'title' | 'date' | 'path' | 'author' | 'excerpt' | 'tags'>
//       & { readonly coverImage: Maybe<{ readonly childImageSharp: Maybe<{ readonly fluid: Maybe<GatsbyImageSharpFluidFragment> }> }> }
//     ) }
//   )> };

export const BlogPost = ({ children }: { children: ReactNode }) => {
    const data = useStaticQuery<GatsbyTypes.BlogPostTemplateQ2Query>(graphql`
        query BlogPostTemplateQ2 {
            markdownRemark {
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
`);
    return (
        <>

        </>
    );
};
