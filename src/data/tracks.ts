import { Track } from "@/types/track";

// Sample tracks - replace audioUrl with your actual audio file paths
// You can place audio files in the public folder and reference them as "/filename.mp3"
export const tracks: Track[] = [
  {
    id: "1",
    title: "Midnight Dreams",
    artist: "Luna Echo",
    album: "Ethereal Nights",
    duration: 245,
    coverUrl: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop",
    audioUrl: "/audio/track1.mp3", // Replace with your audio file
  },
  {
    id: "2",
    title: "Ocean Waves",
    artist: "Coastal Vibes",
    album: "Sea Serenity",
    duration: 198,
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    audioUrl: "/audio/track2.mp3",
  },
  {
    id: "3",
    title: "City Lights",
    artist: "Urban Soul",
    album: "Neon Stories",
    duration: 312,
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    audioUrl: "/audio/track3.mp3",
  },
  {
    id: "4",
    title: "Forest Rain",
    artist: "Nature Sounds",
    album: "Calm Collection",
    duration: 267,
    coverUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
    audioUrl: "/audio/track4.mp3",
  },
  {
    id: "5",
    title: "Electric Pulse",
    artist: "Synth Wave",
    album: "Digital Era",
    duration: 224,
    coverUrl: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=400&h=400&fit=crop",
    audioUrl: "/audio/track5.mp3",
  },
  {
    id: "6",
    title: "Sunset Boulevard",
    artist: "Retro Vibes",
    album: "Golden Hour",
    duration: 289,
    coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
    audioUrl: "/audio/track6.mp3",
  },
];
