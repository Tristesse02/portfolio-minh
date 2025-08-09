import React from "react";
import { ContentItem } from "@/types";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import styles from "../../styles/SocialMusicPortfolio/ContentList.module.css";
import Equalizer from "../animation/Equalizer";

interface Props {
  items: ContentItem[];
  currentId: string;
  onSelect: (item: ContentItem) => void;
}

export default function ContentList({ items, currentId, onSelect }: Props) {
  return (
    <div className={styles.listWrapper}>
      {items.map((item) => {
        const active = currentId === item.id;
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
              <Equalizer
                size={14}
                color="#22c55e" // or "currentColor"
                playing={active} // animate only if active
                className={styles.eqIcon}
              />
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
