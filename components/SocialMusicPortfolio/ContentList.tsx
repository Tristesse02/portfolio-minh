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
}

export default function ContentList({
  items,
  currentId,
  onSelect,
  isPlaying,
}: Props) {
  return (
    <div className={styles.listWrapper}>
      {items.map((item) => {
        const active = currentId === item.id;
        const activeAndPlaying = active && isPlaying;
        return (
          <Card
            key={item.id}
            className={`${styles.card} ${
              currentId === item.id ? styles.cardActive : ""
            }`}
            onClick={() => onSelect(item)}
          >
            <div className={styles.cardInner}>
              {/* <div className={styles.statusDot} /> */}
              <span className={styles.leadingIcon}>
                {active ? (
                  activeAndPlaying ? (
                    <Equalizer
                      size={14}
                      color="#22c55e"
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
              <div className={styles.cardStats}>
                {/* <span className={styles.statGroup}>
                <Heart className="w-4 h-4" />
                {item.likes}
              </span>
              <span className={styles.statGroup}>
                <MessageCircle className="w-4 h-4" />
                {item.comments}
              </span> */}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
