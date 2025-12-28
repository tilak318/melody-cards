export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
  loopForever?: boolean; // if true, track will loop infinitely when played
}

export interface Album {
  id: string;
  title: string;
  tracks: Track[];
}

