import * as React from "react";

import Banner from "../components/Banner";
import Sidebar from "../components/Sidebar";
import { layout, article } from "../styles/layout.module.scss";
import "../styles/reset.css";
import "../styles/style.css";

// markup
const IndexPage = () => {
  return (
    <main className={layout}>
      <aside>
        <Sidebar />
      </aside>
      <article className={article}>
        <Banner />
      </article>
    </main>
  );
};

export default IndexPage;
