import React from "react";

import { section, items, item, more } from "../styles/section.module.scss";
import image from "../images/image.jpg";

const Section = () => {
  return (
    <section className={section}>
      <h2>Selected projects</h2>
      <p>A few of my favorite works.</p>

      <div className={items}>
        <div className={item}>
          <img src={image} alt="" />
          <h3>Ricebox</h3>
          <ul>
            <li>UI/UX Design</li>
            <li>Web development</li>
            <li>Web deliver</li>
            <li>Web drawing</li>
          </ul>
          <p>A homepage design for restaurant based in Indonesia.</p>
          <a href="" target="_blank">
            View project
          </a>
        </div>

        <div className={item}>
          <img src={image} alt="" />
          <h3>Ricebox</h3>
          <ul>
            <li>UI/UX Design</li>
            <li>Web development</li>
          </ul>
          <p>A homepage design for restaurant based in Indonesia.</p>
          <a href="" target="_blank">
            View project
          </a>
        </div>
      </div>

      <div className={more}>
        <p>I share more of my portfolio on Behance, come check it out!</p>
        <a href="">Check out my Behance</a>
      </div>
    </section>
  );
};

export default Section;
