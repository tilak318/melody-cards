import { Music, ArrowLeft } from "lucide-react";
import { tracks, albums } from "@/data/tracks";
import { TrackCard } from "@/components/TrackCard";
import { AlbumCard } from "@/components/AlbumCard";
import { NowPlaying } from "@/components/NowPlaying";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Album } from "@/types/track";
import { useState } from "react";

const Index = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    playTrack,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    changeVolume,
  } = useAudioPlayer();

  const displayTracks = selectedAlbum ? selectedAlbum.tracks : tracks;

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/5 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center justify-center mb-2">
            <h1 className="text-2xl font-bold gradient-text">Akshardham Daily Rituals</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 md:px-8">
        <div className="mx-auto max-w-[1600px]">
          {/* Back Button */}
          {selectedAlbum && (
            <button
              onClick={() => setSelectedAlbum(null)}
              className="mb-6 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Main</span>
            </button>
          )}

          {/* Section Title */}
          {selectedAlbum && (
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {selectedAlbum.title}
            </h2>
          )}

          {/* All Cards Grid - Tracks and Albums combined */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {displayTracks.map((track) => (
              <div key={track.id}>
                <TrackCard
                  track={track}
                  isActive={currentTrack?.id === track.id}
                  isPlaying={currentTrack?.id === track.id && isPlaying}
                  onPlay={(track) => playTrack(track, displayTracks)}
                />
              </div>
            ))}
            {!selectedAlbum && albums.map((album) => (
              <div key={album.id}>
                <AlbumCard album={album} onClick={setSelectedAlbum} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Now Playing Bar */}
      <NowPlaying
        track={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        volume={volume}
        onTogglePlay={togglePlay}
        onNext={playNext}
        onPrevious={playPrevious}
        onSeek={seekTo}
        onVolumeChange={changeVolume}
      />
    </div>
  );
};

export default Index;
