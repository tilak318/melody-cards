import { useState, useRef, useEffect, useCallback } from "react";
import { Track } from "@/types/track";
import { tracks } from "@/data/tracks";

export type LoopMode = "none" | "all" | "one";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [loopMode, setLoopMode] = useState<LoopMode>("none");
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (loopMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else if (loopMode === "all" || shuffle) {
        playNext();
      } else {
        // Check if there's a next track
        if (currentIndex < tracks.length - 1) {
          playNext();
        } else {
          setIsPlaying(false);
          setProgress(0);
        }
      }
    };

    const handleError = () => {
      console.log("Audio file not found. Please add your audio files to the public/audio folder.");
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, [loopMode, shuffle, currentIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playTrackAtIndex = useCallback((index: number) => {
    if (!audioRef.current || index < 0 || index >= tracks.length) return;
    
    const track = tracks[index];
    audioRef.current.src = track.audioUrl;
    audioRef.current.play().catch(() => {
      console.log("Could not play audio. Make sure the file exists.");
    });
    setCurrentTrack(track);
    setCurrentIndex(index);
    setIsPlaying(true);
    setProgress(0);
  }, []);

  const playTrack = useCallback((track: Track) => {
    if (!audioRef.current) return;

    const index = tracks.findIndex(t => t.id === track.id);

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
      playTrackAtIndex(index);
    }
  }, [currentTrack, isPlaying, playTrackAtIndex]);

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
      const randomIndex = Math.floor(Math.random() * tracks.length);
      playTrackAtIndex(randomIndex);
    } else {
      const nextIndex = currentIndex >= tracks.length - 1 ? 0 : currentIndex + 1;
      playTrackAtIndex(nextIndex);
    }
  }, [currentIndex, shuffle, playTrackAtIndex]);

  const playPrevious = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    
    const prevIndex = currentIndex <= 0 ? tracks.length - 1 : currentIndex - 1;
    playTrackAtIndex(prevIndex);
  }, [currentIndex, playTrackAtIndex]);

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
