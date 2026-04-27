import React, { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { PlaylistModal } from '../playlist/PlaylistModal';
import { usePlaylist } from '../../context/PlaylistContext';
import type { PlaylistItem } from '../../context/PlaylistContext';

interface SaveToPlaylistButtonProps {
  item: PlaylistItem;
  className?: string;
  label?: string;
}

export const SaveToPlaylistButton: React.FC<SaveToPlaylistButtonProps> = ({
  item,
  className = '',
  label = 'Save to Playlist',
}) => {
  const [open, setOpen] = useState(false);
  const { isInAnyPlaylist } = usePlaylist();
  const saved = isInAnyPlaylist(item.id);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-surface hover:bg-surfaceAlt transition-colors text-sm font-medium ${saved ? 'text-primary border-primary/30' : 'text-textPrimary'} ${className}`}
      >
        {saved ? (
          <BookmarkCheck className="w-4 h-4" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
        {saved ? 'Saved' : label}
      </button>

      <PlaylistModal
        isOpen={open}
        onClose={() => setOpen(false)}
        item={item}
      />
    </>
  );
};
