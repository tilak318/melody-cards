import { useState, useRef, useEffect, useCallback } from "react";
import { Track } from "@/types/track";
import { tracks } from "@/data/tracks";

export type LoopMode = "none" | "all" | "one";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Track[]>(tracks);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [loopMode, setLoopMode] = useState<LoopMode>("none");
  const [shuffle, setShuffle] = useState(false);

  const playTrackAtIndex = useCallback((index: number, playlist: Track[] = currentPlaylist) => {
    if (!audioRef.current || index < 0 || index >= playlist.length) return;

    const track = playlist[index];
    audioRef.current.src = track.audioUrl;
    audioRef.current.play().catch(() => {
      console.log("Could not play audio. Make sure the file exists.");
    });
    setCurrentTrack(track);
    setCurrentIndex(index);
    setCurrentPlaylist(playlist);
    setIsPlaying(true);
    setProgress(0);
  }, [currentPlaylist]);

  const playTrack = useCallback((track: Track, playlist?: Track[]) => {
    if (!audioRef.current) return;

    const activePlaylist = playlist || (currentPlaylist.some(t => t.id === track.id) ? currentPlaylist : tracks);
    const index = activePlaylist.findIndex(t => t.id === track.id);

    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          console.log("Could not play audio. Make sure the file exists.");
        });
        setIsPlaying(true);
      }
    } else {
      playTrackAtIndex(index, activePlaylist);
    }
  }, [currentTrack, isPlaying, playTrackAtIndex, currentPlaylist]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        console.log("Could not play audio.");
      });
      setIsPlaying(true);
    }
  }, [currentTrack, isPlaying]);

  const playNext = useCallback(() => {
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * currentPlaylist.length);
      playTrackAtIndex(randomIndex);
    } else {
      const nextIndex = currentIndex >= currentPlaylist.length - 1 ? 0 : currentIndex + 1;
      playTrackAtIndex(nextIndex);
    }
  }, [currentIndex, shuffle, playTrackAtIndex, currentPlaylist]);

  const playPrevious = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    const prevIndex = currentIndex <= 0 ? currentPlaylist.length - 1 : currentIndex - 1;
    playTrackAtIndex(prevIndex);
  }, [currentIndex, playTrackAtIndex, currentPlaylist]);

  const seekTo = useCallback((percentage: number) => {
    if (!audioRef.current || !duration) return;
    const time = (percentage / 100) * duration;
    audioRef.current.currentTime = time;
    setProgress(percentage);
  }, [duration]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, []);

  const toggleLoopMode = useCallback(() => {
    setLoopMode(prev => {
      if (prev === "none") return "all";
      if (prev === "all") return "one";
      return "none";
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    setShuffle(prev => !prev);
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleError = (e: ErrorEvent) => {
      console.error("Audio error:", e);
      console.log("Audio file not found or could not be loaded:", audio.src);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleError as any);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError as any);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (loopMode === "one") {
        audio.currentTime = 0;
        audio.play().catch(err => console.error("Error playing next track:", err));
      } else if (loopMode === "all" || shuffle) {
        playNext();
      } else {
        if (currentIndex < currentPlaylist.length - 1) {
          playNext();
        } else {
          setIsPlaying(false);
          setProgress(0);
        }
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [loopMode, shuffle, currentIndex, playNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return {
    currentTrack,
    isPlaying,
    progress,
    duration,
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
  };
};
