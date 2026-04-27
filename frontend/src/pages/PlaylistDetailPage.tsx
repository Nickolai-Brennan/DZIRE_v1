import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlaylist } from '../context/PlaylistContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Trash2, Play } from 'lucide-react';
import { track } from '../utils/track';

export const PlaylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPlaylist, removeFromPlaylist, reorderPlaylist } = usePlaylist();
  const playlist = getPlaylist(id ?? '');

  if (!playlist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-textPrimary">Playlist Not Found</h1>
        <Link to="/playlists" className="text-primary hover:underline">Back to Playlists</Link>
      </div>
    );
  }

  const getItemHref = (type: string, slug: string) => {
    const map: Record<string, string> = {
      position: `/positions/${slug}`,
      review: `/reviews/${slug}`,
      story: `/stories/${slug}`,
      article: `/magazine`,
      product: `/reviews/${slug}`,
    };
    return map[type] ?? '/';
  };

  const handleStartMode = () => {
    track('playlist_start_mode', { playlistId: playlist.id });
    if (playlist.items[0]) {
      window.location.href = getItemHref(playlist.items[0].type, playlist.items[0].slug);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/playlists" className="flex items-center gap-2 text-textMuted hover:text-textPrimary text-sm transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />Back to Playlists
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-textPrimary">{playlist.name}</h1>
            <p className="text-textMuted mt-1">{playlist.items.length} item{playlist.items.length !== 1 ? 's' : ''}</p>
          </div>
          {playlist.items.length > 0 && (
            <Button variant="primary" onClick={handleStartMode} className="flex items-center gap-2">
              <Play className="w-4 h-4" />Start Mode
            </Button>
          )}
        </div>

        {playlist.items.length === 0 ? (
          <div className="text-center py-20 text-textMuted bg-surface rounded-2xl border border-white/10">
            <p className="text-xl font-bold mb-2">This playlist is empty</p>
            <p className="mb-6">Browse positions and save them here.</p>
            <Link to="/positions">
              <Button variant="secondary">Browse Positions</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {playlist.items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-surface rounded-2xl border border-white/10 p-4 hover:border-white/20 transition-colors"
              >
                <span className="text-textMuted text-sm font-mono w-6 text-center">{index + 1}</span>

                {item.image && (
                  <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                )}

                <div className="flex-1 min-w-0">
                  <Link
                    to={getItemHref(item.type, item.slug)}
                    onClick={() => track('playlist_item_click', { itemId: item.id, playlistId: playlist.id })}
                    className="font-medium text-textPrimary hover:text-primary transition-colors block truncate"
                  >
                    {item.title}
                  </Link>
                  <Badge variant="category" className="mt-1">{item.type}</Badge>
                </div>

                <div className="flex gap-1 shrink-0">
                  {index > 0 && (
                    <button
                      onClick={() => reorderPlaylist(playlist.id, index, index - 1)}
                      className="p-1.5 rounded-lg hover:bg-surfaceAlt text-textMuted hover:text-textPrimary transition-colors text-xs"
                      title="Move up"
                    >
                      ↑
                    </button>
                  )}
                  {index < playlist.items.length - 1 && (
                    <button
                      onClick={() => reorderPlaylist(playlist.id, index, index + 1)}
                      className="p-1.5 rounded-lg hover:bg-surfaceAlt text-textMuted hover:text-textPrimary transition-colors text-xs"
                      title="Move down"
                    >
                      ↓
                    </button>
                  )}
                  <button
                    onClick={() => removeFromPlaylist(playlist.id, item.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-textMuted hover:text-red-400 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
