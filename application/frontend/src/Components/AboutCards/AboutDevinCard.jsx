import React from "react";
import image from "../../Assets/img/pfp/DevinKern.jpg";
import styles from "../../Assets/Styles/AboutDevin.module.css";

function AboutKevinCard() {
  return (
    <div className={styles.aboutDevinSection}>
      <div className={styles.aboutDevinCard}>
        <img src={image} alt="Devin"></img>

        <div className={styles.aboutDevinCardLeft}>
          <p className={styles.heading}>Devin Kern</p>
          <p className={styles.subHeading}>GitHub Master</p>
          <p>Major: Computer Science</p>
          <p>GitHub: DevinLKern</p>
        </div>
      </div>
    </div>
  );
}

export default AboutKevinCard;
