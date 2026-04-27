import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { usePlaylist } from '../../context/PlaylistContext';
import type { PlaylistItem } from '../../context/PlaylistContext';
import { BookmarkCheck, Plus } from 'lucide-react';

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PlaylistItem;
}

export const PlaylistModal: React.FC<PlaylistModalProps> = ({ isOpen, onClose, item }) => {
  const { playlists, createPlaylist, saveToPlaylist, isInAnyPlaylist } = usePlaylist();
  const [newName, setNewName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  const handleSave = (playlistId: string) => {
    saveToPlaylist(playlistId, item);
    setSaved(playlistId);
    setTimeout(() => {
      setSaved(null);
      onClose();
    }, 800);
  };

  const handleCreate = () => {
    if (!newName.trim()) return;
    const playlist = createPlaylist(newName.trim());
    saveToPlaylist(playlist.id, item);
    setSaved(playlist.id);
    setNewName('');
    setShowCreate(false);
    setTimeout(() => {
      setSaved(null);
      onClose();
    }, 800);
  };

  const alreadySaved = isInAnyPlaylist(item.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Save to Playlist">
      <div className="p-6 space-y-4">
        {alreadySaved && (
          <div className="flex items-center gap-2 text-primary text-sm bg-primary/10 rounded-xl px-4 py-2">
            <BookmarkCheck className="w-4 h-4" />
            <span>Already saved to a playlist</span>
          </div>
        )}

        <p className="text-sm text-textMuted">Choose a playlist to save <strong className="text-textPrimary">"{item.title}"</strong></p>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => handleSave(playlist.id)}
              disabled={saved === playlist.id}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-surfaceAlt hover:bg-surface border border-white/8 transition-colors text-left"
            >
              <div>
                <p className="text-sm font-medium text-textPrimary">{playlist.name}</p>
                <p className="text-xs text-textMuted">{playlist.items.length} items</p>
              </div>
              {saved === playlist.id && (
                <BookmarkCheck className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>

        {showCreate ? (
          <div className="flex gap-2">
            <input
              autoFocus
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              placeholder="Playlist name..."
              className="flex-1 bg-surfaceAlt border border-white/10 rounded-xl px-3 py-2 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
            />
            <Button variant="primary" onClick={handleCreate}>Create</Button>
            <Button variant="secondary" onClick={() => setShowCreate(false)}>Cancel</Button>
          </div>
        ) : (
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create New Playlist
          </button>
        )}
      </div>
    </Modal>
  );
};
