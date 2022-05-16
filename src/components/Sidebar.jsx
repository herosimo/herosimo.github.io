import React from "react";
import { Link } from "gatsby";

import { sidebar, logo, social, text } from "../styles/sidebar.module.scss";
import siteLogo from "../images/logo.svg";
import behance from "../images/behance.svg";
import github from "../images/github.svg";
import linkedin from "../images/linkedin.svg";
import mail from "../images/mail.svg";
import play from "../images/play.svg";

const Sidebar = () => {
  return (
    <section className={sidebar}>
      <Link to="/">
        <img className={logo} src={siteLogo} alt="Site Logo" />
      </Link>

      <div className={social}>
        <a href="" target="_blank" title="Visit my Behance">
          <img src={behance} alt="Behance" />
        </a>
        <a href="" target="_blank" title="Visit my Github">
          <img src={github} alt="Github" />
        </a>

        <a href="" target="_blank" title="Visit my Linkedin">
          <img src={linkedin} alt="Linkedin" />
        </a>

        <a href="" target="_blank" title="Email me">
          <img src={mail} alt="Mail" />
        </a>
      </div>

      <div className={text}>
        <span>Hello World</span>
        <img src={play} alt="play" />
        <img src={play} alt="play" />
        <img src={play} alt="play" />
      </div>
    </section>
  );
};

export default Sidebar;
