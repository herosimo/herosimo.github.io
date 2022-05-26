import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { banner } from "../styles/banner.module.scss";

const Banner = () => {
  const data = useStaticQuery(graphql`
    query {
      mdx(slug: { eq: "" }) {
        frontmatter {
          bannerTitle
          bannerSubtitle
          bannerText
        }
      }
    }
  `);

  function createInnerHTML(data) {
    return { __html: data };
  }

  return (
    <section className={banner}>
      <div style={{ position: "relative" }}>
        <span dangerouslySetInnerHTML={createInnerHTML(data.mdx.frontmatter.bannerSubtitle)} />
      </div>
      <h1>{data.mdx.frontmatter.bannerTitle}</h1>
      {data.mdx.frontmatter.bannerText.map((item, i) => {
        return <p key={i}>{item}</p>;
      })}
    </section>
  );
};

export default Banner;
