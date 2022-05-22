import React from "react";

import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/reset.css";
import "../styles/style.scss";
import { layout, aside, article } from "../styles/layout.module.scss";

const Layout = ({ children }) => {
  return (
    <main className={layout}>
      <aside className={aside}>
        <Sidebar />
      </aside>
      <article className={article}>
        {children}
        <Footer />
      </article>
    </main>
  );
};

export default Layout;
