// File: /app/SocialMusicPortfolio/index.tsx
"use client";

import { ContentItem } from "@/types";
import { UserPlus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

import TabNav from "@/components/SocialMusicPortfolio/TabNav";
import Player from "@/components/SocialMusicPortfolio/Player";
import ContentList from "@/components/SocialMusicPortfolio/ContentList";
import styles from "../../styles/SocialMusicPortfolio/index.module.css";
import TestimonialModal from "../modal/TestimonialModal";
import FanInviteModal from "../modal/FanInviteModal";

import rawContentItems from "@/data/contentItems.json" assert { type: "json" };
import fallbackTestimonial from "@/data/testimonials.json" assert { type: "json" };
import TestimonialCenterStage from "./TestimonialCenterStage";
import SiteFooter from "./SiteFooter"; // adjust path if needed

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

  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180);
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  const filteredContent = contentItems.filter(
    (item) => item.category === activeTab
  );

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleSelectContent = (item: ContentItem) => {
    setCurrentContent(item);
    setIsPlaying(true);
    setCurrentTime(0);

    window.scrollTo({ top: 0, behavior: "smooth" });
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
      const maxScroll = 120; // adjust how much scroll until fully white
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setScrollOpacity(progress);
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
        className={`${styles.header}`}
        data-solid={scrollOpacity > 0.4 ? "1" : "0"}
        style={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--headerAlpha" as any]: scrollOpacity,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--accent" as any]: dominantColor ?? "#7dd3fc", // cyan accent (↔ change here)
          boxShadow: `0 8px 24px rgba(0,0,0,${0.2 * scrollOpacity})`,
          zIndex: 50,
        }}
      >
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <div className={styles.logoBox}>
              <span className={styles.logoText}>MV</span>
            </div>
            <a
              href="/MinhVu_resume.pdf" // <-- replace with your actual resume link
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-lg hover:underline cursor-pointer"
            >
              Minh Vu
            </a>
          </div>
          <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </header>
      <div className={styles.pageContent}>
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
            {activeTab === "about" ? "Blogs" : activeTab}
          </h2>
          <ContentList
            items={filteredContent}
            currentId={currentContent.id}
            onSelect={handleSelectContent}
            isPlaying={isPlaying}
          />
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.titleRow}>
                <h2 className={styles.sectionTitle}>Fans</h2>
                <span className={styles.countPill}>
                  {testimonials.length} comments
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
      </div>
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
      {/* <FloatingMusicPlayer
        content={currentContent}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handlePlayPause}
        dominantColor={dominantColor}
      /> */}
      <SiteFooter accent={dominantColor} />
    </div>
  );
}
