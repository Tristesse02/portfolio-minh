// LyricBox.tsx
"use client";

import React, { useMemo } from "react";
import styles from "../../styles/SocialMusicPortfolio/LyricBox.module.css";

type Props = {
  title: string;
  body: string;
  tags?: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

export default function LyricBox({
  title,
  body,
  tags = [],
  ctaHref = "#",
  ctaLabel = "Read full story →",
}: Props) {
  const stanzas = useMemo(() => {
    const byBreak = body
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (byBreak.length > 1) return byBreak.slice(0, 3);

    const sentences = body.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length <= 3) return [body.trim()];
    return [
      sentences.slice(0, 2).join(" "),
      sentences.slice(2, 3).join(" "),
      sentences.slice(3, 6).join(" "),
    ].filter(Boolean);
  }, [body]);

  return (
    <aside className={styles.lyricBox} aria-label="Lyric teaser">
      <div className={styles.content}>
        <div className={styles.main}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.body} role="doc-introduction">
            {stanzas.map((p, i) => (
              <p key={i} className={i === 1 ? styles.chorus : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          {tags.length > 0 && (
            <div className={styles.tags} aria-label="tags">
              {tags.slice(0, 5).map((t) => (
                <span className={styles.tag} key={t}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* <a className={styles.cta} href={ctaHref}>
            {ctaLabel}
          </a> */}
        </div>
      </div>
    </aside>
  );
}
