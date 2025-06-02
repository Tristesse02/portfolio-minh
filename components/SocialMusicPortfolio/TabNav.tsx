"use client";

import React from "react";
import styles from "../../styles/SocialMusicPortfolio/TabNav.module.css";

interface Props {
  activeTab: "about" | "projects" | "experience";
  setActiveTab: (tab: "about" | "projects" | "experience") => void;
}

export default function TabNav({ activeTab, setActiveTab }: Props) {
  return (
    <nav className={styles.nav}>
      {(["about", "projects", "experience"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`${styles.tabButton} ${
            activeTab === tab ? styles.tabButtonActive : ""
          }`}
        >
          {tab === "about"
            ? "About Me"
            : tab === "projects"
            ? "Projects"
            : "Work Experiences"}
        </button>
      ))}
    </nav>
  );
}
