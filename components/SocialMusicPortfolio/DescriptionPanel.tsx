import React, { useEffect, useState } from "react";
import { ContentItem } from "@/types";
import styles from "../../styles/SocialMusicPortfolio/DescriptionPanel.module.css";

interface Props {
  content: ContentItem;
  setIsAnimating: (value: boolean) => void;
}

export default function DescriptionPanel({ content, setIsAnimating }: Props) {
  const wordsArray = content.description.split(" ");
  console.log(wordsArray);
  const [visible, setVisible] = useState<boolean[]>(
    Array(wordsArray.length).fill(false)
  );

  useEffect(() => {
    setVisible(Array(wordsArray.length).fill(false));
    setIsAnimating(true);

    const timeouts: NodeJS.Timeout[] = [];

    wordsArray.forEach((_, i) => {
      const timeout = setTimeout(() => {
        setVisible((prev) => {
          const updated = [...prev];
          updated[i] = true;

          // Unlock only after the final word fades in
          if (i === wordsArray.length - 1) {
            setTimeout(() => setIsAnimating(false), 200);
          }

          return updated;
        });
      }, i * 100);

      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout); // clean up if unmounted
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
