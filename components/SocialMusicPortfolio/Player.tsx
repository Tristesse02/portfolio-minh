import Image from "next/image";
// @ts-expect-error ColorThief has no types, imported as CommonJS default
import ColorThief from "colorthief";
import { ContentItem } from "@/types";
// import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";

import Slider from "../../components/ui/Slider";
import styles from "../../styles/SocialMusicPortfolio/Player.module.css";

import LyricBox from "./LyricBox";

const MAX_BACKDROP_OPACITY = 0.55;
interface Props {
  content: ContentItem;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  setDominantColor: (color: string | null) => void;
}

export default function Player({
  content,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  setDominantColor,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState([23]);
  const imgRef = useRef<HTMLImageElement>(null);
  const [backdropUrl, setBackdropUrl] = useState(content.imageUrl);
  const [nextBackdropUrl, setNextBackdropUrl] = useState<string | null>(null);
  const [backdropOpacity, setBackdropOpacity] = useState(MAX_BACKDROP_OPACITY);
  const [nextOpacity, setNextOpacity] = useState(0);

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

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume[0] / 200;
    }
  }, []);

  useEffect(() => {
    if (content.imageUrl !== backdropUrl) {
      let frame: number;
      let opacityProgress = 0;
      const maxOpacity = MAX_BACKDROP_OPACITY;

      setNextBackdropUrl(content.imageUrl);
      setNextOpacity(0); // Reset fade-in
      setBackdropOpacity(maxOpacity); // Reset fade-out

      const step = () => {
        opacityProgress += 0.005; // adjust speed here

        setNextOpacity(Math.min(opacityProgress * maxOpacity, maxOpacity));
        setBackdropOpacity(Math.max((1 - opacityProgress) * maxOpacity, 0));

        if (opacityProgress < 1) {
          frame = requestAnimationFrame(step);
        } else {
          setBackdropUrl(content.imageUrl);
          setNextBackdropUrl(null);
          setBackdropOpacity(maxOpacity); // reset base
          setNextOpacity(0);
        }
      };

      frame = requestAnimationFrame(step);
      return () => cancelAnimationFrame(frame);
    }
  }, [content.imageUrl]);

  // useEffect(() => {
  //   if (content.imageUrl !== backdropUrl) {
  //     setBackdropUrl(content.imageUrl);
  //   }
  // }, [content.imageUrl]);

  useEffect(() => {
    if (content.imageUrl !== backdropUrl) {
      setNextBackdropUrl(content.imageUrl);
      const timeout = setTimeout(() => {
        setBackdropUrl(content.imageUrl); // update image after fade
        setNextBackdropUrl(null);
      }, 6000); // 10s

      return () => clearTimeout(timeout);
    }
  }, [content.imageUrl]);

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
        const shiftedH = (h + 5) % 360; // Optional: bias hue a bit
        const boostedS = Math.min(s * 1.4 + 10, 100); // Bold, vibrant
        const boostedL = Math.max(Math.min(l + 5, 85), 40); // Slight glow

        const vividColor = hslToCss(shiftedH, boostedS, boostedL);
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
      <div className={styles.flexRowLayout}>
        <div className={styles.leftPanel}>
          <div className={styles.imageWrapper}>
            <div className={styles.dynamicBackdrop}>
              <Image
                src={backdropUrl}
                alt="Backdrop"
                fill
                priority
                style={{ opacity: backdropOpacity, transition: "none" }}
                className={styles.backdropImage}
              />

              {nextBackdropUrl && (
                <Image
                  src={nextBackdropUrl}
                  alt="New Backdrop"
                  fill
                  priority
                  style={{ opacity: nextOpacity, transition: "none" }}
                  className={styles.backdropImage}
                />
              )}
            </div>
            <Image
              key={content.imageUrl}
              src={content.imageUrl}
              alt={content.title}
              width={600}
              height={400}
              className={styles.fadeImage}
              ref={imgRef}
            />
            <div className={styles.overlay}>
              <div className={styles.controls}>
                <div className={styles.controlsInner}>
                  <div className={styles.controlsTop}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progress}
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className={styles.bottomRightControls}>
                    <div className={styles.volumeWrapper}>
                      <Volume2 className="w-4 h-4 text-white" />
                      <div className={styles.volumeSlider}>
                        <Slider
                          value={volume}
                          onValueChange={handleVolumeChange}
                          max={100}
                          step={1}
                          className="w-20"
                        />
                      </div>
                    </div>
                    <span className={styles.timestamp}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  <div className={styles.trackInfo}>
                    <div className={styles.titleRow}>
                      <button
                        onClick={onPlayPause}
                        className={styles.playButton}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>
                      <div className={styles.titleGroup}>
                        <div className={styles.titleStack}>
                          <span className={styles.titleLayer}>
                            {content.title}
                          </span>
                          <span
                            className={`${styles.titleLayer} ${styles.titleLayerSecond}`}
                          >
                            {content.altTitle}
                          </span>
                        </div>
                        <div className={styles.playingNotiStack}>
                          <span
                            className={`${styles.commonPlayingText} ${
                              isPlaying
                                ? styles.nowPlaying
                                : styles.notNowPlaying
                            }`}
                          >
                            Now Playing
                          </span>
                          <span
                            className={`${styles.commonPlayingText} ${
                              !isPlaying ? styles.onPause : styles.notOnPause
                            }`}
                          >
                            On Pause
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          {/* <div className={styles.lyricBlock}>
            <div className={styles.lyricTitle}>{content.title}</div>
            <div className={styles.lyricDescription}>{content.description}</div>
          </div> */}
          <LyricBox
            label="About me — Track 01"
            title="Building with pace"
            body={content.description}
            tags={content.tags}
            ctaHref="#long-read"
            nowPlayingMeta={`Now Playing • ${formatTime(
              currentTime
            )} / ${formatTime(duration)}`}
            progress={duration ? currentTime / duration : 0}
          />
        </div>
        <audio ref={audioRef} src={content.audioUrl} preload="metadata" />
      </div>
    </div>
  );
}
