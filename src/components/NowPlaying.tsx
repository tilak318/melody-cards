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
      <div className="glass fixed bottom-0 left-0 right-0 h-24 flex items-center justify-center border-t border-border z-50">
        <p className="text-muted-foreground">Select a track to play</p>
      </div>
    );
  }

  const currentTime = (progress / 100) * (duration || track.duration);

  return (
    <div className="glass fixed bottom-0 left-0 right-0 px-4 py-3 md:px-8 animate-slide-up border-t border-border z-50">
      {/* Mobile Layout - Stacked */}
      <div className="md:hidden flex flex-col gap-2">
        {/* Top row: Title and Controls */}
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground truncate flex-1 mr-4">{track.title}</h4>
          <div className="flex items-center gap-2">
            <button onClick={onPrevious} className="text-muted-foreground p-1">
              <SkipBack className="h-4 w-4" fill="currentColor" />
            </button>
            <button onClick={onTogglePlay} className="play-button h-10 w-10">
              {isPlaying ? (
                <Pause className="h-4 w-4 text-primary-foreground" fill="currentColor" />
              ) : (
                <Play className="h-4 w-4 text-primary-foreground ml-0.5" fill="currentColor" />
              )}
            </button>
            <button onClick={onNext} className="text-muted-foreground p-1">
              <SkipForward className="h-4 w-4" fill="currentColor" />
            </button>
          </div>
        </div>
        {/* Progress Bar Row */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-8 text-right">
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
          <span className="text-xs text-muted-foreground w-8">
            {formatTime(duration || track.duration)}
          </span>
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden md:flex mx-auto max-w-7xl items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="min-w-0">
            <h4 className="font-medium text-foreground truncate">{track.title}</h4>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-4">
            <button onClick={onPrevious} className="text-muted-foreground transition-colors hover:text-foreground p-2">
              <SkipBack className="h-5 w-5" fill="currentColor" />
            </button>
            <button onClick={onTogglePlay} className="play-button h-12 w-12">
              {isPlaying ? (
                <Pause className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              ) : (
                <Play className="h-5 w-5 text-primary-foreground ml-0.5" fill="currentColor" />
              )}
            </button>
            <button onClick={onNext} className="text-muted-foreground transition-colors hover:text-foreground p-2">
              <SkipForward className="h-5 w-5" fill="currentColor" />
            </button>
          </div>
          <div className="flex w-full max-w-md items-center gap-2">
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
        <div className="flex items-center gap-2 flex-1 justify-end">
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
