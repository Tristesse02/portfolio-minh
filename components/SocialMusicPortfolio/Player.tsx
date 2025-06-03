import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ContentItem } from "@/types";
import Image from "next/image";
import { Heart, Pause, Play, Volume2 } from "lucide-react";
import styles from "../../styles/SocialMusicPortfolio/Player.module.css";
import Slider from "../../components/ui/Slider";

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
  const [volume, setVolume] = useState([75]);

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

  return (
    <div className={styles.playerContainer}>
      <div className={styles.imageWrapper}>
        <Image
          src={content.imageUrl}
          alt={content.title}
          width={600}
          height={400}
          className="w-full h-80 object-cover"
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
                  (window.location.href = `/article/${content.id}?playing=${isPlaying}&time=${currentTime}`)
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
              <h3>{content.title}</h3>
              <p>Now Playing</p>
            </div>
          </div>
        </div>
        <audio ref={audioRef} src={content.audioUrl} preload="metadata" />
      </div>
    </div>
  );
}
