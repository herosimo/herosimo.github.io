import * as React from "react";

import Banner from "../components/Banner";
import Sidebar from "../components/Sidebar";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { index, aside, article } from "../styles/index.module.scss";
import "../styles/reset.css";
import "../styles/style.scss";

// markup
const IndexPage = () => {
  return (
    <main className={index}>
      <aside className={aside}>
        <Sidebar />
      </aside>
      <article className={article}>
        <Banner />
        <Section />
        <Footer />
      </article>
    </main>
  );
};

export default IndexPage;
