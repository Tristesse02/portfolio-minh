import React from "react";
import { ContentItem } from "@/types";
import styles from "../../styles/SocialMusicPortfolio/DescriptionPanel.module.css";
import WordReveal from "../animation/WordReveal";

interface Props {
  content: ContentItem;
}

export default function DescriptionPanel({ content }: Props) {
  return (
    <div className={styles.panelWrapper}>
      <div className={styles.descriptionBox}>
        <h3 className={styles.descriptionHeading}>Lyrics</h3>
        <WordReveal text={content.description} contentId={content.id} />
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
