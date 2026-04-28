import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePlaylist } from "../context/PlaylistContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ListMusic, Plus, Trash2, Share2 } from "lucide-react";
import { Modal } from "../components/ui/Modal";
import { track } from "../utils/track";

export const PlaylistsPage: React.FC = () => {
  const { playlists, createPlaylist, deletePlaylist } = usePlaylist();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");

  const handleCreate = () => {
    if (!newName.trim()) return;
    createPlaylist(newName.trim());
    track("playlist_create", { name: newName });
    setNewName("");
    setShowCreate(false);
  };

  const handleShare = (playlistId: string) => {
    const url = `${window.location.origin}/playlists/${playlistId}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    track("playlist_share", { playlistId });
    alert("Playlist link copied to clipboard!");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-primary text-sm uppercase tracking-widest mb-1">
              My Collection
            </p>
            <h1 className="text-4xl font-black text-textPrimary">Playlists</h1>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Playlist
          </Button>
        </div>

        {playlists.length === 0 ? (
          <div className="text-center py-20 text-textMuted">
            <ListMusic className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-xl font-bold mb-2">No playlists yet</p>
            <p className="mb-6">
              Save positions to create your first playlist.
            </p>
            <Link to="/positions">
              <Button variant="secondary">Browse Positions</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {playlists.map((playlist) => (
              <Card key={playlist.id} className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Link to={`/playlists/${playlist.id}`}>
                      <h3 className="font-bold text-textPrimary hover:text-primary transition-colors">
                        {playlist.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-textMuted">
                      {playlist.items.length} item
                      {playlist.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShare(playlist.id)}
                      className="p-1.5 rounded-lg hover:bg-surfaceAlt text-textMuted hover:text-textPrimary transition-colors"
                      title="Share"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePlaylist(playlist.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-textMuted hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {playlist.items.length > 0 ? (
                  <div className="flex gap-1 flex-wrap">
                    {playlist.items.slice(0, 3).map((item) => (
                      <Badge key={item.id} variant="category">
                        {item.type}
                      </Badge>
                    ))}
                    {playlist.items.length > 3 && (
                      <Badge variant="category">
                        +{playlist.items.length - 3} more
                      </Badge>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-textMuted">
                    Empty — add positions to get started
                  </p>
                )}

                <Link to={`/playlists/${playlist.id}`} className="block mt-4">
                  <Button variant="secondary" className="w-full text-sm">
                    Open Playlist
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Playlist Modal */}
      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create New Playlist"
      >
        <div className="p-6 space-y-4">
          <input
            autoFocus
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="Playlist name..."
            className="w-full bg-surfaceAlt border border-white/10 rounded-xl px-4 py-3 text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
          />
          <div className="flex gap-3">
            <Button variant="primary" onClick={handleCreate} className="flex-1">
              Create
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowCreate(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
