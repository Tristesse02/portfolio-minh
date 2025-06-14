import Image from "next/image";
// @ts-expect-error
import ColorThief from "colorthief";
import { ContentItem } from "@/types";
import { Button } from "@/components/ui/button";
// import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import { Heart, Pause, Play, Volume2 } from "lucide-react";

import Slider from "../../components/ui/Slider";
import styles from "../../styles/SocialMusicPortfolio/Player.module.css";

interface Props {
  content: ContentItem;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
}

export default function Player({
  content,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState([15]);
  // const [bgColor, setBgColor] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const colorThief = new ColorThief();

    const isTooDarkOrGray = ([r, g, b]: number[]) => {
      const brightness = (r + g + b) / 3;
      const colorVariance = Math.max(r, g, b) - Math.min(r, g, b);
      return brightness < 50 || colorVariance < 15;
    };

    const extractColor = () => {
      try {
        const palette = colorThief.getPalette(img, 6); // top 6 colors
        const filtered = palette.filter(
          (color: [number, number, number]) => !isTooDarkOrGray(color)
        );
        const [r, g, b] = filtered.length ? filtered[0] : palette[0];

        const [h, s, l] = rgbToHsl(r, g, b);
        const intenseS = Math.min(s + 30, 100); // boost saturation
        const adjustedL = Math.max(Math.min(l - 5, 70), 30); // tweak lightness

        const vividColor = hslToCss(h, intenseS, adjustedL);
        setDominantColor(vividColor);
      } catch (err) {
        console.error("Failed to extract color:", err);
      }
    };

    if (img.complete) {
      extractColor();
    } else {
      img.addEventListener("load", extractColor, { once: true });
    }
  }, [content.imageUrl]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, content]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(value);
    audio.volume = value[0] / 200;
  };

  const rgbToHsl = (
    r: number,
    g: number,
    b: number
  ): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h: number = 0;
    let s: number;
    const l: number = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return [h, s * 100, l * 100];
  };

  const hslToCss = (h: number, s: number, l: number): string => {
    return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
  };

  return (
    <div className={styles.playerContainer}>
      <div
        className={styles.dynamicBackdrop}
        style={{
          background: dominantColor
            ? `radial-gradient(ellipse at center, ${dominantColor} 0%, transparent 70%)`
            : undefined,
        }}
      />
      <div className={styles.imageWrapper}>
        <Image
          key={content.imageUrl}
          src={content.imageUrl}
          alt={content.title}
          width={600}
          height={400}
          className={`w-full h-80 object-cover object-[center_${content.percentage}%] ${styles.fadeImage}`}
        />
        <img
          src={content.imageUrl}
          ref={imgRef}
          crossOrigin="anonymous"
          style={{ display: "none" }}
        />
        <div className={styles.overlay}>
          <div className={styles.controls}>
            <div className={styles.controlsTop}>
              <Button
                onClick={onPlayPause}
                size="sm"
                className={styles.playButton}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </Button>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className={styles.timestamp}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-white" />
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-20"
                />
              </div>
            </div>
            <div className={styles.bottomRightControls}>
              <Button size="sm" variant="ghost" className={styles.iconButton}>
                <Heart className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className={styles.infoButton}
                onClick={() =>
                  (window.location.href = `/article/${content.id}/?playing=${isPlaying}&time=${currentTime}`)
                }
              >
                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Button>
            </div>
            <div className={styles.trackInfo}>
              <div className={styles.titleStack}>
                <span className={styles.titleLayer}>{content.title}</span>
                <span
                  className={`${styles.titleLayer} ${styles.titleLayerSecond}`}
                >
                  {content.altTitle}
                </span>
              </div>
              <p>Now Playing</p>
            </div>
          </div>
        </div>
        <audio ref={audioRef} src={content.audioUrl} preload="metadata" />
      </div>
    </div>
  );
}
