import React, { useEffect, useState } from "react";
import { ContentItem } from "@/types";
import styles from "../../styles/SocialMusicPortfolio/DescriptionPanel.module.css";

interface Props {
  content: ContentItem;
}

export default function DescriptionPanel({ content }: Props) {
  const wordsArray = content.description.split(" ");
  console.log(wordsArray);
  const [visible, setVisible] = useState<boolean[]>(
    Array(wordsArray.length).fill(false)
  );

  useEffect(() => {
    wordsArray.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, i * 100); // 100ms delay per word
    });
  }, [content.description]);

  return (
    <div className={styles.panelWrapper}>
      <div className={styles.descriptionBox}>
        <h3 className={styles.descriptionHeading}>Lyrics</h3>
        <div className={`${styles.descriptionText} ${styles.fadeInParagraph}`}>
          {wordsArray.map((word, i) => {
            const endsWithNewLine = word.endsWith("\n");
            const cleanedWord = word.replace(/\n/g, ""); // fully remove all newline characters

            return endsWithNewLine ? (
              <div key={i} style={{ display: "inline" }}>
                <span
                  className={`${styles.word} ${
                    visible[i] ? styles.wordVisible : ""
                  }`}
                >
                  {cleanedWord}&nbsp;
                </span>
                <br />
                <br />
              </div>
            ) : (
              <span key={i} className={styles.wordWrapper}>
                <span
                  className={`${styles.word} ${
                    visible[i] ? styles.wordVisible : ""
                  }`}
                >
                  {cleanedWord}&nbsp;
                </span>
              </span>
            );
          })}
        </div>
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
