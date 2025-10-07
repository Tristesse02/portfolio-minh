"use client";

import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { useState } from "react";

type Props = { accent?: string | null };

export default function SiteFooter({ accent }: Props) {
  const [copied, setCopied] = useState(false);
  const email = "minhfromwork@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error("Failed to copy email");
    }
  };

  const links = [
    {
      href: "https://linkedin.com/in/tminhvu",
      label: "LinkedIn",
      Icon: Linkedin,
    },
    {
      href: "https://github.com/tristesse02",
      label: "GitHub",
      Icon: Github,
    },
    {
      href: "https://leetcode.com/u/Tristesse02/",
      label: "LeetCode",
      Icon: Code2,
    },
    {
      href: `mailto:${email}`,
      label: "Email",
      Icon: Mail,
      onClick: handleCopy,
      tooltip: copied ? "Copied!" : "Copy",
    },
  ];

  return (
    <footer
      className="flex flex-col items-center justify-center mt-16 mb-8 text-[#9ca3af] text-sm select-none"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={{ ["--accent" as any]: accent ?? "#7dd3fc" }}
    >
      <p className="mb-5 text-xs md:text-sm text-gray-500">
        © {new Date().getFullYear()} Minh Vu · Designed & developed by{" "}
        <span className="font-medium text-white">Minh Vu</span>
      </p>

      <div className="mb-3 flex items-center gap-6 text-gray-500">
        {links.map(({ href, label, Icon, onClick, tooltip }) => (
          <div key={label} className="relative group">
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              title={label}
              onClick={
                onClick
                  ? (e) => {
                      e.preventDefault();
                      onClick();
                    }
                  : undefined
              }
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Icon className="size-4" strokeWidth={1.5} />
            </a>

            {/* Tooltip */}
            <div
              className="absolute bottom-[-1.8rem] left-1/2 -translate-x-1/2 text-xs text-gray-400 
                         opacity-0 group-hover:opacity-100 transition-all duration-200 
                         translate-y-1 group-hover:translate-y-0 pointer-events-none"
            >
              {tooltip ?? label}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
