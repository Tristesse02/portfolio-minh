import React from "react";
import { ContentItem } from "@/types";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Pause } from "lucide-react";
import styles from "../../styles/SocialMusicPortfolio/ContentList.module.css";
import Equalizer from "../animation/Equalizer";
import StaticBars from "../animation/StaticBars";
import { Play } from "lucide-react";

interface Props {
  items: ContentItem[];
  currentId: string;
  onSelect: (item: ContentItem) => void;
  isPlaying: boolean;
  dominantColor: string | null;
}

export default function ContentList({
  items,
  currentId,
  onSelect,
  isPlaying,
  dominantColor,
}: Props) {
  return (
    <div className={styles.listWrapper}>
      {items.map((item) => {
        const active = currentId === item.id;
        const activeAndPlaying = active && isPlaying;
        const tint = dominantColor ?? "#a855f7";
        return (
          <Card
            key={item.id}
            className={`${styles.card} ${
              currentId === item.id ? styles.cardActive : ""
            } border-0`}
            style={
              active
                ? {
                    background: `color-mix(in srgb, ${tint} 4%, transparent)`,
                    // boxShadow: `0 0 12px color-mix(in srgb, ${tint} 25%, transparent)`, // hex + alpha (80 ≈ 50%)
                  }
                : undefined
            }
            onClick={() => onSelect(item)}
          >
            <div className={styles.cardInner}>
              {/* <div className={styles.statusDot} /> */}
              <span className={styles.leadingIcon}>
                {active ? (
                  activeAndPlaying ? (
                    <Equalizer
                      size={14}
                      color={tint}
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
            </div>
          </Card>
        );
      })}
    </div>
  );
}
