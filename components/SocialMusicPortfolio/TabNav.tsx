"use client";

import React from "react";

interface Props {
  activeTab: "about" | "projects" | "experience";
  setActiveTab: (tab: "about" | "projects" | "experience") => void;
}

export default function TabNav({ activeTab, setActiveTab }: Props) {
  return (
    <nav className="flex gap-8">
      {(["about", "projects", "experience"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`font-medium ${
            activeTab === tab
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600"
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
