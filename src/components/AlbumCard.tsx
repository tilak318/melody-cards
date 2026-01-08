import { Album } from "@/types/track";

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
                    <h3 className="font-semibold text-foreground truncate whitespace-nowrap">{album.title}</h3>
                </div>
                <span className="text-sm text-muted-foreground ml-4 flex-shrink-0">
                    {album.tracks.length} tracks
                </span>
            </div>
        </div>
    );
};
