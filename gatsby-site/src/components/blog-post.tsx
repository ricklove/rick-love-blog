import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Header } from './header';
import './layout.css';

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
