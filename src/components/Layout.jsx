import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/reset.css";
import "../styles/style.scss";
import { layout, aside, article } from "../styles/layout.module.scss";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
      </Helmet>
      <main className={layout}>
        <aside className={aside}>
          <Sidebar />
        </aside>
        <article className={article}>
          {children}
          <Footer />
        </article>
      </main>
    </>
  );
};

export default Layout;
