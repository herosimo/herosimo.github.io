import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { footer, contact, legal } from "../styles/footer.module.scss";
import play from "../images/play.svg";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      mdx(id: { eq: "01fbae03-5953-5e1d-bb01-d2321705e183" }) {
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
        <div>
          <img src={play} alt="play" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
