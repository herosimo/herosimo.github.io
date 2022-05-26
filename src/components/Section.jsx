import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { section, items, itemClass, imageClass, more } from "../styles/section.module.scss";

const Section = ({ data }) => {
  return (
    <section className={section}>
      <h2>{data.sectionTitle}</h2>
      <p>{data.sectionSubtitle}</p>

      <div className={items}>
        {data.items.map((item, i) => {
          const image = getImage(item.itemImage);

          return (
            <div key={i} className={itemClass}>
              <GatsbyImage image={image} alt={item.itemTitle} className={imageClass} />

              <h3>{item.itemTitle}</h3>
              <ul>
                {item.itemTags.map((tag, i) => (
                  <li key={i}>{tag}</li>
                ))}
              </ul>
              <p>{item.itemSubtitle}</p>
              <a href={item.itemLink} target="_blank" rel="noreferrer">
                View project
              </a>
            </div>
          );
        })}
      </div>

      <div className={more}>
        <p>{data.moreTitle}</p>
        <a href={data.moreLink} target="_blank" rel="noreferrer">
          {data.moreLinkTitle}
        </a>
      </div>
    </section>
  );
};

export default Section;
