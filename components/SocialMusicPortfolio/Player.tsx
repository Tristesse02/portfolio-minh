import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ContentItem } from "@/types";
import Image from "next/image";
import { Heart, Pause, Play } from "lucide-react";
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
              <Button size="sm" variant="ghost" className={styles.iconButton}>
                <Heart className="w-4 h-4" />
              </Button>
              <span className={styles.timestamp}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
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
