import { Music } from "lucide-react";
import { tracks } from "@/data/tracks";
import { TrackCard } from "@/components/TrackCard";
import { NowPlaying } from "@/components/NowPlaying";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const Index = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    loopMode,
    shuffle,
    playTrack,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    changeVolume,
    toggleLoopMode,
    toggleShuffle,
  } = useAudioPlayer();

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/5 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">SoundWave</h1>
          </div>
          <p className="text-muted-foreground mt-4 max-w-lg">
            Your personal music player. Click on any track to start listening.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-semibold text-foreground mb-6">Your Library</h2>
          
          {/* Track Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TrackCard
                  track={track}
                  isActive={currentTrack?.id === track.id}
                  isPlaying={currentTrack?.id === track.id && isPlaying}
                  onPlay={playTrack}
                />
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-12 bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="font-semibold text-foreground mb-3">Add Your Music</h3>
            <p className="text-sm text-muted-foreground">
              To add your own audio files:
            </p>
            <ol className="mt-2 text-sm text-muted-foreground list-decimal list-inside space-y-1">
              <li>Create a folder called <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">audio</code> inside the <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">public</code> directory</li>
              <li>Add your MP3 files (e.g., track1.mp3, track2.mp3)</li>
              <li>Update the <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">audioUrl</code> in <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">src/data/tracks.ts</code></li>
            </ol>
          </div>
        </div>
      </main>

      {/* Now Playing Bar */}
      <NowPlaying
        track={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        volume={volume}
        loopMode={loopMode}
        shuffle={shuffle}
        onTogglePlay={togglePlay}
        onNext={playNext}
        onPrevious={playPrevious}
        onSeek={seekTo}
        onVolumeChange={changeVolume}
        onToggleLoop={toggleLoopMode}
        onToggleShuffle={toggleShuffle}
      />
    </div>
  );
};

export default Index;
