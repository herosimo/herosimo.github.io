import React from "react";

import { footer, contact, legal } from "../styles/footer.module.scss";
import play from "../images/play.svg";

const Footer = () => {
  return (
    <footer className={footer}>
      <h2>Get in touch</h2>
      <p>Let's make something great together!</p>

      <ul className={contact}>
        <li>
          <h3>Email</h3>
          <a href="" target="_blank">
            herosimo06@gmail.com
          </a>
        </li>
        <li>
          <h3>Linkedin</h3>
          <a href="" target="_blank">
            linkedin.com/herosimo
          </a>
        </li>
      </ul>

      <div className={legal}>
        <p>© 2021, All rights reserved</p>
        <div>
          <img src={play} alt="play" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
