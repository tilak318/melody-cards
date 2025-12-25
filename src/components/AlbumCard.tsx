import { Album } from "@/types/track";
import { Folder } from "lucide-react";

interface AlbumCardProps {
    album: Album;
    onClick: (album: Album) => void;
}

export const AlbumCard = ({ album, onClick }: AlbumCardProps) => {
    return (
        <div
            className="track-card group cursor-pointer min-h-[80px]"
            onClick={() => onClick(album)}
        >
            <div className="p-4 flex items-center justify-between h-full">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                        <Folder className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">{album.title}</h3>
                </div>
                <span className="text-sm text-muted-foreground ml-4 flex-shrink-0">
                    {album.tracks.length} tracks
                </span>
            </div>
        </div>
    );
};
