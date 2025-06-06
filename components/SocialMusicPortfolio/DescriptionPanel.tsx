import React from "react";
import { ContentItem } from "@/types";
import styles from "../../styles/SocialMusicPortfolio/DescriptionPanel.module.css";

interface Props {
  content: ContentItem;
}

export default function DescriptionPanel({ content }: Props) {
  return (
    <div className={styles.panelWrapper}>
      <div className={styles.descriptionBox}>
        <h3 className={styles.descriptionHeading}>Lyrics</h3>
        <p className={styles.descriptionText}>
          {content.description.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
              <br />
            </span>
          ))}
        </p>
      </div>
      <div className={styles.statsBox}>
        <div className={styles.statsGrid}>
          <div>
            <div className={styles.statValue}>{content.likes}</div>
            <div className={styles.statTitle}>likes</div>
          </div>
          <div>
            <div className={styles.statValue}>{content.comments}</div>
            <div className={styles.statTitle}>replays</div>
          </div>
        </div>
      </div>
    </div>
  );
}
