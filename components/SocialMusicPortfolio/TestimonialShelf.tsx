import React, { useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import Equalizer from "@/components/animation/Equalizer";
import styles from "../../styles/SocialMusicPortfolio/TestimonialShelf.module.css";

export type TestimonialItem = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  message: string;
  avatar?: string;
  tags?: string[]; // <- tech stack / themes, e.g. ["Frontend","Infra"]
  featured?: boolean;
  weight?: number; // higher first if you want manual ordering
};

type Props = {
  items: TestimonialItem[];
  dominantColor: string | null;
  normalizeTint?: (c: string) => string; // optional: your helper
  mixPercentForBg?: (c: string) => string; // optional: your helper -> "18%"
};

export default function TestimonialShelf({
  items,
  dominantColor,
  normalizeTint,
  mixPercentForBg,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const [tag, setTag] = useState<string>("All");
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const rawTint = dominantColor ?? "#a855f7";
  const vividTint = useMemo(
    () => (normalizeTint ? normalizeTint(rawTint) : rawTint),
    [rawTint, normalizeTint]
  );
  const bgMix = useMemo(
    () => (mixPercentForBg ? mixPercentForBg(rawTint) : "10%"),
    [rawTint, mixPercentForBg]
  );

  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.tags?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const list =
      tag === "All" ? items : items.filter((i) => i.tags?.includes(tag));
    // feature/weight sort
    return list
      .slice()
      .sort(
        (a, b) =>
          (b.weight ?? 0) - (a.weight ?? 0) ||
          Number(b.featured) - Number(a.featured)
      );
  }, [items, tag]);

  const active = filtered.find((i) => i.id === activeId) ?? filtered[0];

  const scrollBy = (dx: number) =>
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section
      className={`${styles.wrapper}`}
      style={
        {
          ["--tint" as any]: vividTint,
          ["--bgMix" as any]: bgMix,
          ["--hoverBoost" as any]: "6%",
        } as React.CSSProperties
      }
      aria-label="Testimonials"
    >
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h3>Shout-outs</h3>
          <span className={styles.count}>{items.length} testimonials</span>
        </div>

        <div
          className={styles.filters}
          role="tablist"
          aria-label="Filter by tag"
        >
          {allTags.map((t) => (
            <button
              key={t}
              className={`${styles.chip} ${t === tag ? styles.chipActive : ""}`}
              onClick={() => setTag(t)}
              role="tab"
              aria-selected={t === tag}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.shelfBar}>
        <button
          className={styles.navBtn}
          onClick={() => scrollBy(-320)}
          aria-label="Scroll left"
        >
          ‹
        </button>
        <div ref={scrollerRef} className={styles.scroller}>
          {filtered.map((t) => {
            const isActive = active?.id === t.id;
            return (
              <Card
                key={t.id}
                className={`${styles.tile} ${
                  isActive ? styles.tileActive : ""
                } border-0`}
                onClick={() => setActiveId(t.id)}
                role="button"
                aria-pressed={isActive}
              >
                <div className={styles.tileHead}>
                  <span className={styles.leadingIcon} aria-hidden>
                    {isActive ? (
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
                  <div className={styles.nameRole}>
                    <div className={styles.name}>{t.name}</div>
                    <div className={styles.role}>
                      {t.role}
                      {t.company ? ` @ ${t.company}` : ""}
                    </div>
                  </div>
                </div>
                {t.tags?.length ? (
                  <div className={styles.tileTags}>
                    {t.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
        <button
          className={styles.navBtn}
          onClick={() => scrollBy(320)}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>

      {/* Spotlight panel */}
      {active && (
        <article className={`${styles.spotlight} ${styles.softFrame}`}>
          <header className={styles.spotHeader}>
            <div className={styles.name}>{active.name}</div>
            <div className={styles.role}>
              {active.role}
              {active.company ? ` @ ${active.company}` : ""}
            </div>
          </header>
          <blockquote className={styles.quote}>“{active.message}”</blockquote>
          {active.tags?.length ? (
            <div className={styles.tagsRow}>
              {active.tags.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      )}
    </section>
  );
}
