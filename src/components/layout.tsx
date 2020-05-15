import React, { ReactNode } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Header } from "./header";
import { Footer } from "./footer";
import "../styles/layout.css";

export const Layout = ({ children }: { children: ReactNode }) => {

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          logo {
            src
            alt
          }
          logoText
          defaultTheme
          copyrights
          mainMenu {
            title
            path
          }
          showMenuItems
          menuMoreText
        }
      }
    }
  `);

  type QueryResult = {
    title: string;
    logo: { src: string, alt: string };
    logoText: string;
    defaultTheme: string;
    mainMenu: { title: string, path: string }[];
    showMenuItems: number;
    menuMoreText: string;
    copyrights: string;
  }

  const {
    title,
    logo,
    logoText,
    defaultTheme,
    mainMenu,
    showMenuItems,
    menuMoreText,
    copyrights,
  } = data.site.siteMetadata as QueryResult;

  return (
    <div className='container'>
      <Header
        siteTitle={title}
        siteLogo={logo}
        logoText={logoText}
        defaultTheme={defaultTheme}
        mainMenu={mainMenu}
        mainMenuItems={showMenuItems}
        menuMoreText={menuMoreText}
      />
      <div className='content'>{children}</div>
      <Footer copyrights={copyrights} />
    </div>
  );
};
