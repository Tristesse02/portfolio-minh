// File: /app/SocialMusicPortfolio/index.tsx
"use client";

import { useState, useEffect } from "react";
import rawContentItems from "@/data/contentItems.json" assert { type: "json" };
import testimonials from "@/data/testimonials.json";
import { ContentItem } from "@/types";
import SidebarProfile from "@/components/SocialMusicPortfolio/SidebarProfile";
import TabNav from "@/components/SocialMusicPortfolio/TabNav";
import Player from "@/components/SocialMusicPortfolio/Player";
import ContentList from "@/components/SocialMusicPortfolio/ContentList";
import DescriptionPanel from "@/components/SocialMusicPortfolio/DescriptionPanel";
import Testimonials from "@/components/SocialMusicPortfolio/Testimonials";
import styles from "../../styles/SocialMusicPortfolio/index.module.css";

export default function SocialMusicPortfolio() {
  const contentItems = rawContentItems as ContentItem[];
  const [activeTab, setActiveTab] = useState<
    "about" | "projects" | "experience"
  >("about");
  const [currentContent, setCurrentContent] = useState<ContentItem>(
    contentItems[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180);

  const filteredContent = contentItems.filter(
    (item) => item.category === activeTab
  );

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleSelectContent = (item: ContentItem) => {
    setCurrentContent(item);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <div className={styles.logoBox}>
              <span className={styles.logoText}>MV</span>
            </div>
            <span className="font-semibold text-lg">Minh Vu</span>
          </div>
          <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </header>

      <div className={styles.pageContent}>
        <div className={styles.leftCol}>
          <SidebarProfile />
        </div>

        <div className={styles.centerCol}>
          <Player
            content={currentContent}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            onPlayPause={handlePlayPause}
          />
          <h2 className={styles.contentHeading}>
            {activeTab === "about" ? "Get to know me" : activeTab}
          </h2>
          <ContentList
            items={filteredContent}
            currentId={currentContent.id}
            onSelect={handleSelectContent}
          />
        </div>

        <div className={styles.rightCol}>
          <DescriptionPanel content={currentContent} />
          <div className={styles.testimonialsCard}>
            <h3 className="font-bold mb-4">Testimonial</h3>
            <Testimonials testimonials={testimonials} />
          </div>
        </div>
      </div>
    </div>
  );
}
