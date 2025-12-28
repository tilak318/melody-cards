import { Track } from "@/types/track";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface NowPlayingProps {
  track: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  duration: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (value: number) => void;
  onVolumeChange: (value: number) => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const NowPlaying = ({
  track,
  isPlaying,
  progress,
  duration,
  volume,
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
}: NowPlayingProps) => {
  if (!track) {
    return (
      <div className="glass fixed bottom-0 left-0 right-0 h-24 flex items-center justify-center border-t border-border">
        <p className="text-muted-foreground">Select a track to play</p>
      </div>
    );
  }

  const currentTime = (progress / 100) * (duration || track.duration);

  return (
    <div className="glass fixed bottom-0 left-0 right-0 px-4 py-3 md:px-8 animate-slide-up border-t border-border">
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="min-w-0">
            <h4 className="font-medium text-foreground truncate">{track.title}</h4>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Previous */}
            <button
              onClick={onPrevious}
              className="text-muted-foreground transition-colors hover:text-foreground p-2"
              title="Previous"
            >
              <SkipBack className="h-5 w-5" fill="currentColor" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={onTogglePlay}
              className="play-button h-12 w-12"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              ) : (
                <Play className="h-5 w-5 text-primary-foreground ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              onClick={onNext}
              className="text-muted-foreground transition-colors hover:text-foreground p-2"
              title="Next"
            >
              <SkipForward className="h-5 w-5" fill="currentColor" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="hidden w-full max-w-md items-center gap-2 md:flex">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1">
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                onValueChange={(value) => onSeek(value[0])}
                className="cursor-pointer"
              />
            </div>
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(duration || track.duration)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden items-center gap-2 flex-1 justify-end md:flex">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={(value) => onVolumeChange(value[0] / 100)}
            className="w-24 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
