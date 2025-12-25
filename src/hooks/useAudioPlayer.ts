import { useState, useRef, useEffect, useCallback } from "react";
import { Track } from "@/types/track";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

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
      setIsPlaying(false);
      setProgress(0);
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
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playTrack = useCallback((track: Track) => {
    if (!audioRef.current) return;

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
      audioRef.current.src = track.audioUrl;
      audioRef.current.play().catch(() => {
        console.log("Could not play audio. Make sure the file exists.");
      });
      setCurrentTrack(track);
      setIsPlaying(true);
      setProgress(0);
    }
  }, [currentTrack, isPlaying]);

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

  const seekTo = useCallback((percentage: number) => {
    if (!audioRef.current || !duration) return;
    const time = (percentage / 100) * duration;
    audioRef.current.currentTime = time;
    setProgress(percentage);
  }, [duration]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, []);

  return {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    playTrack,
    togglePlay,
    seekTo,
    changeVolume,
  };
};
