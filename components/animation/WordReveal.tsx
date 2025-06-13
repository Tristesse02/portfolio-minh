import React, { useEffect, useState } from "react";
import styles from "../../styles/animation/WordReveal.module.css"; // We'll create this next

interface WordRevealProps {
  text: string;
  delayPerWord?: number; // Optional: delay between words
  setIsAnimating: (value: boolean) => void;
}

export default function WordReveal({
  text,
  delayPerWord = 100,
  setIsAnimating,
}: WordRevealProps) {
  const wordsArray = text.split(" ");
  const [visible, setVisible] = useState<boolean[]>(
    Array(wordsArray.length).fill(false)
  );

  useEffect(() => {
    setVisible(Array(wordsArray.length).fill(false));
    setIsAnimating(true);

    wordsArray.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const updated = [...prev];
          updated[i] = true;

          if (i === wordsArray.length - 1) {
            setTimeout(() => setIsAnimating(false), 200); // slight buffer
          }

          return updated;
        });
      }, i * delayPerWord);
    });
  }, [text]);

  return (
    <div className={styles.revealContainer}>
      {wordsArray.map((word, i) => {
        const endsWithNewline = word.endsWith("\n");
        const cleanWord = word.replace(/\n/g, "");

        return endsWithNewline ? (
          <div key={i} style={{ display: "inline" }}>
            <span
              className={`${styles.word} ${visible[i] ? styles.visible : ""}`}
            >
              {cleanWord}&nbsp;
            </span>
            <br />
            <br />
          </div>
        ) : (
          <span key={i} className={styles.wordWrapper}>
            <span
              className={`${styles.word} ${visible[i] ? styles.visible : ""}`}
            >
              {cleanWord}&nbsp;
            </span>
          </span>
        );
      })}
    </div>
  );
}
