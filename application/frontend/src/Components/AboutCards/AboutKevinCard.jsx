import React from "react";
import kev_pfp from "../../Assets/img/pfp/kyaru.png";
import styles from "../../Assets/Styles/AboutKevin.module.css";

function AboutKevinCard() {
  return (
    <div className={styles.aboutKevinCard}>
      <div className={styles.aboutKevinPfp}>
        <img src={kev_pfp} alt="kevin"></img>
      </div>

      <div className={styles.aboutKevinProfile}>
        <div className={styles.aboutKevinNames}>
          <h1 className={styles.aboutKevinNames__name}>Chen-kai Liu (Kevin)</h1>
          <p className={styles.aboutKevinNames__role}>Frontend Lead / Dev</p>
        </div>

        <div className={styles.aboutKevinDetails}>
          <table>
            <tbody>
              <tr>
                <td>Major</td>
                <td>MS in Computer Science</td>
              </tr>
              <tr>
                <td>Github</td>
                <td>igouProto</td>
              </tr>
              <tr>
                <td>Skills</td>
                <td>HTML / CSS / JavaScript / ReactJS / Python / Adobe XD</td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer>Simple personal about page for CSC648/848 Milestone 0.</footer>
      </div>
    </div>
  );
}

export default AboutKevinCard;
