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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MV</span>
            </div>
            <span className="font-semibold text-lg">Minh Vu</span>
          </div>
          <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">
        <div className="col-span-3">
          <SidebarProfile />
        </div>

        <div className="col-span-6">
          <Player
            content={currentContent}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            onPlayPause={handlePlayPause}
          />
          <h2 className="text-xl font-bold mb-4 capitalize">
            {activeTab === "about" ? "Get to know me" : activeTab}
          </h2>
          <ContentList
            items={filteredContent}
            currentId={currentContent.id}
            onSelect={handleSelectContent}
          />
        </div>

        <div className="col-span-3 space-y-4">
          <DescriptionPanel content={currentContent} />
          <div className="p-4 bg-white rounded-md shadow">
            <h3 className="font-bold mb-4">What people think about me</h3>
            <Testimonials testimonials={testimonials} />
          </div>
        </div>
      </div>
    </div>
  );
}
