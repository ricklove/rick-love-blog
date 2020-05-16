import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Header } from './header';
import './layout.css';


// Use a strong type
type BlogPostTemplateQuery = {
    markdownRemark: {
        id: string;
        html: string;
        excerpt: string;
        frontmatter: {
            title?: string;
            // Function calls: date(formatString: "DD MMMM YYYY")
            date?: string & { __formatString: `DD MMMM YYYY` };
            path?: string;
            author?: string;
            excerpt?: string;
            tags?: string[];
            coverImage?: {
                childImageSharp: {
                    // Function calls: fluid(maxWidth: 800)
                    fluid(maxWidth: 800): {
                        // ...GatsbyImageSharpFluid
                    };
                };
            };
        };
    };
};

// Target Generated Code:
const useBlogPostTemplateQuery = (): BlogPostTemplateQuery => {

    return useStaticQuery(graphql`
    query BlogPostTemplateQuery {
        markdownRemark {
            id
            html
            excerpt
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
        }
    }
`);
};


export const BlogPost = ({ children }: { children: ReactNode }) => {

    const data = useBlogPostTemplateQuery();
    return (
        <>
            <div>{data.markdownRemark.frontmatter.title}</div>
            <div>{data.markdownRemark.frontmatter.author}</div>
            <div>{data.markdownRemark.frontmatter.date}</div>
        </>
    );
};
