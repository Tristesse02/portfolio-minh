// File: /app/SocialMusicPortfolio/index.tsx
"use client";

import { ContentItem } from "@/types";
import { UserPlus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

import SidebarProfile from "@/components/SocialMusicPortfolio/SidebarProfile";
import TabNav from "@/components/SocialMusicPortfolio/TabNav";
import Player from "@/components/SocialMusicPortfolio/Player";
import ContentList from "@/components/SocialMusicPortfolio/ContentList";
import DescriptionPanel from "@/components/SocialMusicPortfolio/DescriptionPanel";
import Testimonials from "@/components/SocialMusicPortfolio/Testimonials";
import styles from "../../styles/SocialMusicPortfolio/index.module.css";
import TestimonialModal from "../modal/TestimonialModal";
import FanInviteModal from "../modal/FanInviteModal";

import rawContentItems from "@/data/contentItems.json" assert { type: "json" };
import fallbackTestimonial from "@/data/testimonials.json" assert { type: "json" };
import FloatingMusicPlayer from "./FloatingMusicPlayer";
import TestimonialPlaylist from "./TestimonialPlaylist";
import TestimonialShelf from "./TestimonialShelf";
import TestimonialCenterStage from "./TestimonialCenterStage";

type Testimonial = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  message: string;
  avatar?: string;
  tags?: string[];
  weight?: number;
};

export default function SocialMusicPortfolio() {
  const contentItems = rawContentItems as ContentItem[];
  const [activeTab, setActiveTab] = useState<
    "about" | "projects" | "experience"
  >("about");
  const [currentContent, setCurrentContent] = useState<ContentItem>(
    contentItems[0]
  );

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  const filteredContent = contentItems.filter(
    (item) => item.category === activeTab
  );

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleSelectContent = (item: ContentItem) => {
    setCurrentContent(item);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleTestimonial = () => {
    const stored = localStorage.getItem("testimonialAuthorized");
    if (stored) {
      try {
        const { expiresAt } = JSON.parse(stored);
        if (new Date(expiresAt) > new Date()) {
          setIsModalOpen(true);
          return;
        } else {
          // Expired
          localStorage.removeItem("testimonialAuthorized");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        localStorage.removeItem("testimonialAuthorized"); // fallback
      }
    }
    setShowInviteModal(true);
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

  useEffect(() => {
    const fetchTestimonials = async () => {
      const res = await fetch("/api/get-testimonials");
      let data = await res.json();
      if (data?.error) {
        console.log("ditconmmeeeeeee", data);
        data = fallbackTestimonial;
      }
      setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mappedTestimonials: Testimonial[] = useMemo(
    () =>
      testimonials.map((t, i) => ({
        id: t.id ?? String(i),
        name: t.name,
        role: t.role,
        company: t.company,
        message: t.message,
        avatar: t.avatar,
        tags: t.tags ?? [],
        weight: t.weight ?? 0,
      })),
    [testimonials]
  );

  return (
    <div className={styles.pageWrapper}>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
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
        {/* <div className={styles.leftCol}>
          <SidebarProfile />
        </div> */}

        <div className={styles.centerCol}>
          <Player
            content={currentContent}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            onPlayPause={handlePlayPause}
            setDominantColor={setDominantColor}
          />
          <h2 className={styles.contentHeading}>
            {activeTab === "about" ? "Get to know me" : activeTab}
          </h2>
          <ContentList
            items={filteredContent}
            currentId={currentContent.id}
            onSelect={handleSelectContent}
            isPlaying={isPlaying}
            dominantColor={dominantColor}
          />
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.titleRow}>
                <h2 className={styles.sectionTitle}>Fans</h2>
                <span className={styles.countPill}>
                  {testimonials.length} testimonials
                </span>
              </div>

              <button className={styles.inviteBtn} onClick={handleTestimonial}>
                <UserPlus width={16} height={16} />
                <span className={styles.inviteLabel}>Leave a shout-out</span>
              </button>
            </div>
            <TestimonialCenterStage
              items={mappedTestimonials}
              dominantColor={dominantColor}
            />
          </section>
        </div>

        {/* <div className={styles.rightCol}>
          <DescriptionPanel content={currentContent} />
          <div className={styles.testimonialsCard}>
            <div className={styles.headerRow}>
              <h3 className="font-bold">Fans</h3>
              <div className={styles.tooltipWrapper}>
                <button
                  className={styles.addUser}
                  type="button"
                  onClick={handleTestimonial}
                >
                  <UserPlus style={{ width: "18px", height: "18px" }} />
                </button>
                <span className={styles.tooltipText}>
                  Want to be a fan and leave a comment? DM for inv 🎉
                </span>
              </div>
            </div>
            <Testimonials testimonials={testimonials} />
          </div>
        </div> */}
      </div>
      {/* <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
      <FanInviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onAuthorized={() => {
          setShowInviteModal(false);
          setIsModalOpen(true);
        }}
      />
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <FloatingMusicPlayer
        content={currentContent}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handlePlayPause}
        dominantColor={dominantColor}
      />
    </div>
  );
}
