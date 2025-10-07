import React from "react";
import { ContentItem } from "@/types";
import { Card } from "@/components/ui/card";
import { Pause } from "lucide-react";
import styles from "../../styles/SocialMusicPortfolio/ContentList.module.css";
import Equalizer from "../animation/Equalizer";
import StaticBars from "../animation/StaticBars";
import { Play } from "lucide-react";
import { mixPercentForBg, normalizeTint } from "@/utils/colorEnhancement";

interface Props {
  items: ContentItem[];
  currentId: string;
  onSelect: (item: ContentItem) => void;
  isPlaying: boolean;
}

export default function ContentList({
  items,
  currentId,
  onSelect,
  isPlaying,
}: Props) {
  // const rawTint = dominantColor ?? "#a855f7";
  const rawTint = "#ffffff";
  const vividTint = normalizeTint(rawTint);
  const bgMix = mixPercentForBg(rawTint);

  {
    return (
      <div
        className={`${styles.listWrapper} ${styles.softFrame}`}
        style={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--tint" as any]: vividTint,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--bgMix" as any]: bgMix,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--hoverBoost" as any]: "3%",
        }}
      >
        {items.map((item) => {
          const active = currentId === item.id;
          const activeAndPlaying = active && isPlaying;
          return (
            <Card
              key={item.id}
              className={`${styles.card} ${
                currentId === item.id ? styles.cardActive : ""
              } border-0`}
              onClick={() => onSelect(item)}
            >
              <div className={styles.cardInner}>
                <span className={styles.leadingIcon}>
                  {active ? (
                    activeAndPlaying ? (
                      <Equalizer
                        size={14}
                        color={rawTint}
                        playing
                        className={styles.eqIcon}
                      />
                    ) : (
                      <Pause
                        size={14}
                        className={styles.pauseIcon}
                        aria-label="Paused"
                      />
                    )
                  ) : (
                    <>
                      <StaticBars size={14} className={styles.staticIcon} />
                      <Play
                        size={14}
                        className={styles.playIcon}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </span>
                <span className={styles.cardTitle}>{item.title}</span>
                {item.tags?.length ? (
                  <span className={styles.cardTagsInline}>
                    {item.tags.slice(0, 5).map((tag, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && (
                          <span className={styles.tagSeparator}>·</span>
                        )}
                        <span className={styles.tagItem}>{tag}</span>
                      </React.Fragment>
                    ))}
                    {item.tags.length > 5 && (
                      <>
                        <span className={styles.tagSeparator}>·</span>
                        <span className={styles.tagItem}>
                          +{item.tags.length - 5}
                        </span>
                      </>
                    )}
                  </span>
                ) : null}
                {item.readTime && (
                  <span className={styles.cardReadTime}>
                    {item.readTime} min read
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
}
