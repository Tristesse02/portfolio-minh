import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/animation/WordReveal.module.css";

interface WordRevealProps {
  text: string;
  delayPerWord?: number;
  contentId: string;
}

export default function WordReveal({
  text,
  delayPerWord = 100,
  contentId,
}: WordRevealProps) {
  const wordsArray = text.split(" ");
  const [visible, setVisible] = useState<boolean[]>(
    Array(wordsArray.length).fill(false)
  );

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Clear previous timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setVisible(Array(wordsArray.length).fill(false));

    wordsArray.forEach((_, i) => {
      const timeoutId = setTimeout(() => {
        setVisible((prev) => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, i * delayPerWord);

      timeoutsRef.current.push(timeoutId);
    });

    // Cleanup on unmount or when contentId changes
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [text, contentId]);

  return (
    <div className={styles.revealContainer}>
      {wordsArray.map((word, i) => {
        const endsWithNewline = word.endsWith("\n");
        const cleanWord = word.replace(/\n/g, "");

        const isVisible = i === 0 || (visible[i] && visible[i - 1]);

        const spanElement = (
          <span className={`${styles.word} ${isVisible ? styles.visible : ""}`}>
            {cleanWord}&nbsp;
          </span>
        );

        return endsWithNewline ? (
          <div key={i} style={{ display: "inline" }}>
            {spanElement}
            <br />
            <br />
          </div>
        ) : (
          <span key={i} className={styles.wordWrapper}>
            {spanElement}
          </span>
        );
      })}
    </div>
  );
}
