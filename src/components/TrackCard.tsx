import { Track } from "@/types/track";
import { Play, Pause } from "lucide-react";

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
      className={`track-card group ${isActive ? "ring-2 ring-primary/50" : ""}`}
      onClick={() => onPlay(track)}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <img
          src={track.coverUrl}
          alt={track.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="play-button h-14 w-14">
            {isActive && isPlaying ? (
              <Pause className="h-6 w-6 text-primary-foreground" fill="currentColor" />
            ) : (
              <Play className="h-6 w-6 text-primary-foreground ml-1" fill="currentColor" />
            )}
          </div>
        </div>
        {isActive && isPlaying && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1">
            <span className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-3 w-1 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate">{track.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{track.album}</span>
          <span>{formatDuration(track.duration)}</span>
        </div>
      </div>
    </div>
  );
};
