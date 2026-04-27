import React, { createContext, useContext, useState, useCallback } from 'react';

export interface PlaylistItem {
  id: string;
  type: 'position' | 'review' | 'article' | 'story' | 'product';
  title: string;
  slug: string;
  image?: string;
  note?: string;
}

export interface Playlist {
  id: string;
  name: string;
  createdAt: string;
  items: PlaylistItem[];
}

interface PlaylistContextValue {
  playlists: Playlist[];
  createPlaylist: (name: string) => Playlist;
  deletePlaylist: (id: string) => void;
  saveToPlaylist: (playlistId: string, item: PlaylistItem) => void;
  removeFromPlaylist: (playlistId: string, itemId: string) => void;
  reorderPlaylist: (playlistId: string, fromIndex: number, toIndex: number) => void;
  getPlaylist: (id: string) => Playlist | undefined;
  isInAnyPlaylist: (itemId: string) => boolean;
}

const PlaylistContext = createContext<PlaylistContextValue | null>(null);

const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-default',
    name: 'My Favourites',
    createdAt: new Date().toISOString(),
    items: [],
  },
];

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);

  const createPlaylist = useCallback((name: string): Playlist => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      createdAt: new Date().toISOString(),
      items: [],
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  }, []);

  const deletePlaylist = useCallback((id: string) => {
    setPlaylists(prev => prev.filter(p => p.id !== id));
  }, []);

  const saveToPlaylist = useCallback((playlistId: string, item: PlaylistItem) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id !== playlistId) return p;
        if (p.items.some(i => i.id === item.id)) return p;
        return { ...p, items: [...p.items, item] };
      })
    );
  }, []);

  const removeFromPlaylist = useCallback((playlistId: string, itemId: string) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id !== playlistId) return p;
        return { ...p, items: p.items.filter(i => i.id !== itemId) };
      })
    );
  }, []);

  const reorderPlaylist = useCallback((playlistId: string, fromIndex: number, toIndex: number) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id !== playlistId) return p;
        const items = [...p.items];
        const [moved] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, moved);
        return { ...p, items };
      })
    );
  }, []);

  const getPlaylist = useCallback(
    (id: string) => playlists.find(p => p.id === id),
    [playlists]
  );

  const isInAnyPlaylist = useCallback(
    (itemId: string) => playlists.some(p => p.items.some(i => i.id === itemId)),
    [playlists]
  );

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
        deletePlaylist,
        saveToPlaylist,
        removeFromPlaylist,
        reorderPlaylist,
        getPlaylist,
        isInAnyPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export function usePlaylist(): PlaylistContextValue {
  const ctx = useContext(PlaylistContext);
  if (!ctx) throw new Error('usePlaylist must be used inside PlaylistProvider');
  return ctx;
}
