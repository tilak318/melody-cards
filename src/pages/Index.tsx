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
    <div className="bg-background min-h-screen" style={{ paddingBottom: '120px' }}>
      <div className="flex flex-col justify-center items-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Background Gradient */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/5 via-transparent to-transparent blur-3xl" />
        </div>

        {/* Header */}
        <header className="relative z-10 px-4 pt-6 pb-12 md:pt-10 md:pb-14 md:px-8">
          <div className="mx-auto max-w-[1600px]">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl md:text-4xl font-semibold gradient-text italic" style={{ fontFamily: "'Playfair Display', serif" }}>Akshardham Daily Rituals</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-4 md:px-8">
          <div className="mx-auto max-w-[1600px]">
            {/* Album Header - Title centered with back button on right */}
            {selectedAlbum && (
              <div className="flex items-center justify-center mb-8 relative max-w-5xl mx-auto">
                <h2 className="text-xl font-semibold text-foreground text-center">
                  {selectedAlbum.title}
                </h2>
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="absolute right-0 p-2 text-primary hover:text-primary/80 transition-colors rounded-full hover:bg-primary/10"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
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
    </div>
  );
};

export default Index;
