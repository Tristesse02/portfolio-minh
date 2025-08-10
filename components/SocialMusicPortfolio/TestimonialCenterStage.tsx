import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Card } from "@/components/ui/card";
import styles from "../../styles/SocialMusicPortfolio/TestimonialCenterStage.module.css";

export type TestimonialItem = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  message: string;
  avatar?: string; // <-- photo here
  tags?: string[];
  weight?: number; // optional manual ordering
};

type Props = {
  items: TestimonialItem[];
  dominantColor: string | null;
  normalizeTint?: (c: string) => string;
  mixPercentForBg?: (c: string) => string; // "18%"
};

export default function TestimonialCenterStage({
  items,
  dominantColor,
  normalizeTint,
  mixPercentForBg,
}: Props) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const setCardRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      cardRefs.current[id] = el;
    },
    []
  );

  const rawTint = dominantColor ?? "#a855f7";
  const vividTint = useMemo(
    () => (normalizeTint ? normalizeTint(rawTint) : rawTint),
    [rawTint, normalizeTint]
  );
  const bgMix = useMemo(
    () => (mixPercentForBg ? mixPercentForBg(rawTint) : "10%"),
    [rawTint, mixPercentForBg]
  );

  // sort (optional): higher weight first
  const sorted = useMemo(
    () => items.slice().sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0)),
    [items]
  );

  // observe which card is centered most
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        // pick the entry with largest intersection ratio
        const best = entries.reduce(
          (m, e) =>
            e.isIntersecting &&
            e.intersectionRatio > (m?.intersectionRatio ?? 0)
              ? e
              : m,
          null as IntersectionObserverEntry | null
        );
        if (best?.target?.getAttribute) {
          const id = best.target.getAttribute("data-id");
          if (id) setActive(id);
        }
      },
      {
        root: el,
        threshold: [0.4, 0.6, 0.8], // “mostly in view”
      }
    );
    sorted.forEach((t) => {
      const n = cardRefs.current[t.id];
      if (n) obs.observe(n);
    });
    return () => obs.disconnect();
  }, [sorted]);

  const scrollBy = (dx: number) =>
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section
      className={styles.wrapper}
      style={
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--tint" as any]: vividTint,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--bgMix" as any]: bgMix,
        } as React.CSSProperties
      }
      aria-label="Shout-outs"
    >
      <div className={styles.rail}>
        <button
          className={styles.nav}
          onClick={() => scrollBy(-360)}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div ref={scrollerRef} className={styles.scroller}>
          {sorted.map((t) => {
            const isActive = active === t.id;
            return (
              <Card
                key={t.id}
                data-id={t.id}
                ref={setCardRef(t.id)}
                className={`${styles.card} border-0`}
                role="group"
                aria-pressed={isActive}
              >
                <div className={styles.head}>
                  <img
                    src={t.avatar || "/placeholder.svg?height=64&width=64"}
                    alt=""
                    className={styles.avatar}
                  />
                  <div className={styles.meta}>
                    <div className={styles.name}>{t.name}</div>
                    <div className={styles.role}>
                      {t.role}
                      {t.company ? ` @ ${t.company}` : ""}
                    </div>
                  </div>
                </div>

                {/* compact preview (only when NOT active) */}
                {!isActive && <p className={styles.preview}>“{t.message}”</p>}

                {/* full quote (only when active) */}
                {isActive && (
                  <blockquote className={styles.quote}>
                    “{t.message}”
                  </blockquote>
                )}
              </Card>
            );
          })}
        </div>

        <button
          className={styles.nav}
          onClick={() => scrollBy(360)}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
}
