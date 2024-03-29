import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { footer, contact, legal } from "../styles/footer.module.scss";
import play from "../images/play.svg";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      mdx(slug: { eq: "layout" }) {
        frontmatter {
          footerSubtitle
          footerTitle
          contact {
            link
            linkTitle
            title
          }
        }
      }
    }
  `);

  const scrolToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={footer}>
      <h2>{data.mdx.frontmatter.footerTitle}</h2>
      <p>{data.mdx.frontmatter.footerSubtitle}</p>

      <ul className={contact}>
        {data.mdx.frontmatter.contact.map((item, i) => {
          return (
            <li key={i}>
              <h3>{item.title}</h3>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.linkTitle}
              </a>
            </li>
          );
        })}
      </ul>

      <div className={legal}>
        <p>Made in 2022</p>
        <div role="button" tabIndex={0} onClick={scrolToTop} onKeyDown={scrolToTop}>
          <img src={play} alt="play" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
