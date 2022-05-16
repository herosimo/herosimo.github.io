import React from "react";

import { banner } from "../styles/banner.module.scss";

const Banner = () => {
  return (
    <section className={banner}>
      <div style={{ position: "relative" }}>
        <span>
          Hey ! I'm
          <br />
          Herosimo Sribiko
        </span>
      </div>
      <h1>I am an Indonesian front-end developer and web designer.</h1>
      <p>
        The majority of my work involves designing and building company profiles and online shops
        based on WordPress (but I can work with other technologies as well).
      </p>
      <p>
        Being a front-end developer and designer enables me to deliver stunning websites with
        pixel-perfect design.
      </p>
    </section>
  );
};

export default Banner;
