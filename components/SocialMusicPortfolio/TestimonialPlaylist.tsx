import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import Equalizer from "@/components/animation/Equalizer";
import styles from "../../styles/SocialMusicPortfolio/TestimonialPlaylist.module.css";

// Your Testimonial looks like: { name, role, company, message, (avatar?) }
export type TestimonialItem = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  message: string;
  avatar?: string;
  tags?: string[];
};

type Props = {
  items: TestimonialItem[];
  dominantColor: string | null;
  // optional: if you already have these helpers, pass them in
  normalizeTint?: (c: string) => string;
  mixPercentForBg?: (c: string) => string; // e.g. "18%"
};

export default function TestimonialPlaylist({
  items,
  dominantColor,
  normalizeTint,
  mixPercentForBg,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  const rawTint = dominantColor ?? "#a855f7";
  const vividTint = useMemo(
    () => (normalizeTint ? normalizeTint(rawTint) : rawTint),
    [rawTint, normalizeTint]
  );
  const bgMix = useMemo(
    () => (mixPercentForBg ? mixPercentForBg(rawTint) : "10%"),
    [rawTint, mixPercentForBg]
  );

  return (
    <section
      className={`${styles.wrapper} ${styles.softFrame}`}
      style={
        {
          ["--tint" as any]: vividTint,
          ["--bgMix" as any]: bgMix,
          ["--hoverBoost" as any]: "6%",
        } as React.CSSProperties
      }
      aria-label="Shout-outs"
    >
      <header className={styles.header}>
        <h3>Shout-outs</h3>
        <p className={styles.meta}>{items.length} testimonials</p>
      </header>

      <div className={styles.list}>
        {items.map((t, i) => {
          const active = activeId === t.id;
          return (
            <Card
              key={t.id}
              className={`${styles.row} ${
                active ? styles.cardActive : ""
              } border-0`}
              onClick={() => setActiveId(active ? null : t.id)}
              role="button"
              aria-expanded={active}
            >
              <div className={styles.rowHead}>
                <span className={styles.leadingIcon} aria-hidden>
                  {active ? (
                    // no audio → show "playing" vibe
                    <Equalizer
                      size={14}
                      color={vividTint}
                      playing
                      className={styles.eqIcon}
                    />
                  ) : (
                    <Play size={14} className={styles.playIcon} />
                  )}
                </span>

                <div className={styles.titleCol}>
                  <div className={styles.title}>{t.name}</div>
                  <div className={styles.subtitle}>
                    {t.role}
                    {t.company ? ` @ ${t.company}` : ""}
                  </div>
                </div>

                {t.tags?.length ? (
                  <div className={styles.tags}>
                    {t.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {active && (
                <div className={styles.expanded}>
                  <blockquote className={styles.quote}>
                    “{t.message}”
                  </blockquote>
                  <div className={styles.caption}>— {t.name}</div>
                </div>
              )}

              {i > 0 && <div className={styles.sep} />}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
