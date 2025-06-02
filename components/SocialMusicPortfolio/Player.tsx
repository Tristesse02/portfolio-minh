import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ContentItem } from "@/types";
import Image from "next/image";
import { Heart, Pause, Play } from "lucide-react";

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
    <div className="mb-6 overflow-hidden rounded-md shadow">
      <div className="relative">
        <Image
          src={content.imageUrl}
          alt={content.title}
          width={600}
          height={400}
          className="w-full h-80 object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 opacity-30 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-4 mb-2">
              <Button
                onClick={onPlayPause}
                size="sm"
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-white/90"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </Button>
              <div className="flex-1">
                <div className="w-full bg-white/20 rounded-full h-1">
                  <div
                    className="bg-white h-1 rounded-full transition-all duration-1000"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Heart className="w-4 h-4" />
              </Button>
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="text-white">
              <h3 className="font-semibold">{content.title}</h3>
              <p className="text-sm text-white/80">Now Playing</p>
            </div>
          </div>
        </div>
        <audio ref={audioRef} src={content.audioUrl} preload="metadata" />
      </div>
    </div>
  );
}
