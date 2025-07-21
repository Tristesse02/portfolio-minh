import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { ContentItem } from "@/types";

interface Props {
  content: ContentItem;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
}

const FloatingMusicPlayer = ({
  content,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
}: Props) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h4 className="font-semibold text-sm">{content.title}</h4>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-4">
            <Button
              onClick={onPlayPause}
              size="sm"
              className="w-8 h-8 rounded-full cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3 ml-0.5" />
              )}
            </Button>

            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-purple-600 h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>

            <span className="text-xs text-gray-600">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingMusicPlayer;
