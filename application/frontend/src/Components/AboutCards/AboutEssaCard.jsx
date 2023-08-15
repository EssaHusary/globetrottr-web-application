import React from "react";
import essa_pfp from "../../Assets/img/pfp/HandsomeEssa.webp";
import styles from "../../Assets/Styles/AboutEssa.module.css";

function AboutEssa() {
  return (
    <div className={styles.aboutEssaContainer}>
      <div className={styles.aboutEssaName}>
        <h1 className={styles.aboutEssaName__name}>Essa Husary</h1>

        <p className={styles.aboutEssa__role}>
          <strong>
            {" "}
            <strong className={styles.aboutEssa__bold}>GitHub</strong>:
            EssaHusary{" "}
          </strong>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <strong>
            {" "}
            <strong className={styles.aboutEssa__bold}>Skills</strong>: HTML,
            CSS, JavaScript, C++, C, Java, MIPS{" "}
          </strong>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <strong>
            {" "}
            <strong className={styles.aboutEssa__bold}>Role</strong>: Scrum
            Master
          </strong>
        </p>
      </div>

      <div className={styles.aboutEssaPfp}>
        <img alt="handsome squidward" src={essa_pfp}></img>
      </div>
    </div>
  );
}

export default AboutEssa;
