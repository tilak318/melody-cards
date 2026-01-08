import { Track } from "@/types/track";

interface TrackCardProps {
  track: Track;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: (track: Track) => void;
}

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const TrackCard = ({ track, isActive, isPlaying, onPlay }: TrackCardProps) => {
  return (
    <div
      className={`track-card group cursor-pointer min-h-[80px] ${isActive ? "ring-2 ring-primary/50" : ""}`}
      onClick={() => onPlay(track)}
    >
      <div className="p-4 flex items-center justify-between h-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate whitespace-nowrap">{track.title}</h3>
        </div>
        <span className="text-sm text-muted-foreground ml-4 flex-shrink-0">{formatDuration(track.duration)}</span>
      </div>
    </div>
  );
};
