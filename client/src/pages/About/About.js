import React from "react";
import css from "./About.module.css";

const About = () => {
  return (
    <div className={css.about}>
      <h1 className="title">About this App.</h1>
      <p>Created by Anthony Hien Vu. </p>
      <p>My contact links are below.</p>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/anthony-hien-vu/">LinkedIn</a>
        </li>
        <li>
          <a href="https://github.com/AVu120">GitHub</a>
        </li>
        <li>
          <a href="https://avu120.github.io/portfolio/">Portfolio</a>
        </li>
      </ul>
    </div>
  );
};

export default About;
