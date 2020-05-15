import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export const SEO = ({
  description,
  lang = 'en',
  meta = [],
  keywords = [
    "gatsby",
    "minimal",
    "starter",
    "blog",
    "theme",
    "dark",
    "light",
    "personal site",
  ],
  title,
}: {
  description?: string;
  lang?: string;
  meta?: { name: string, content: string }[];
  keywords?: string[];
  title?: string;
}) => {
  const data = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);
  const {
    title: siteTitle,
    description: siteDescription,
    author,
  } = data.site.siteMetadata;
  const metaTitle = title || siteTitle;
  const metaDescription = description || siteDescription;
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={title ? `${title} :: ${siteTitle}` : siteTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
              name: `keywords`,
              content: keywords.join(`, `),
            }
            : [],
        )
        .concat(meta)}
    />
  );
};
