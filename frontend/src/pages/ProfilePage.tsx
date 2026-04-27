import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePlaylist } from '../context/PlaylistContext';
import { useFavorites } from '../context/FavoritesContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { User, Heart, ListMusic, Crown, LogOut } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout, isVip } = useAuth();
  const { playlists } = usePlaylist();
  const { favorites } = useFavorites();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <User className="w-16 h-16 text-textMuted" />
        <h1 className="text-3xl font-bold text-textPrimary">Your Profile</h1>
        <p className="text-textMuted text-center max-w-sm">
          Create an account or log in to save playlists, track favourites, and personalise your experience.
        </p>
        <div className="flex gap-4">
          <Link to="/signup">
            <Button variant="primary">Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary">Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const recentPlaylists = playlists.slice(0, 4);
  const recentFavorites = favorites.slice(0, 6);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-surface rounded-2xl border border-white/10 p-8 mb-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-textPrimary">{user?.displayName}</h1>
              <p className="text-sm text-textMuted">{user?.email}</p>
              {isVip && (
                <Badge variant="trophy" className="mt-2">
                  <Crown className="w-3 h-3 mr-1" />VIP Member
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            {!isVip && (
              <Link to="/vip">
                <Button variant="gold">Upgrade to VIP</Button>
              </Link>
            )}
            <Button variant="secondary" onClick={logout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />Log Out
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Playlists', value: playlists.length, icon: ListMusic },
            { label: 'Favourites', value: favorites.length, icon: Heart },
            { label: 'Saved Items', value: playlists.reduce((sum, p) => sum + p.items.length, 0), icon: User },
            { label: 'Status', value: isVip ? 'VIP' : 'Free', icon: Crown },
          ].map(stat => (
            <Card key={stat.label} className="p-5 text-center">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-black text-textPrimary">{stat.value}</p>
              <p className="text-xs text-textMuted mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Playlists Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-textPrimary flex items-center gap-2">
              <ListMusic className="w-5 h-5 text-primary" />My Playlists
            </h2>
            <Link to="/playlists" className="text-sm text-primary hover:text-accent transition-colors">
              View All →
            </Link>
          </div>
          {recentPlaylists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentPlaylists.map(playlist => (
                <Link key={playlist.id} to={`/playlists/${playlist.id}`}>
                  <Card hover className="p-5">
                    <p className="font-bold text-textPrimary mb-1">{playlist.name}</p>
                    <p className="text-sm text-textMuted">{playlist.items.length} items</p>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-textMuted text-sm">No playlists yet. Save positions to get started.</p>
          )}
        </div>

        {/* Favourites Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-textPrimary flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />Favourites
            </h2>
          </div>
          {recentFavorites.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {recentFavorites.map(fav => (
                <Link key={fav.id} to={`/${fav.type}s/${fav.slug}`}>
                  <div className="bg-surface rounded-xl border border-white/10 p-3 text-center hover:border-primary/30 transition-colors">
                    {fav.image && (
                      <img src={fav.image} alt={fav.title} className="w-full aspect-square object-cover rounded-lg mb-2" />
                    )}
                    <p className="text-xs text-textPrimary font-medium line-clamp-2">{fav.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-textMuted text-sm">No favourites yet. Click the heart on any content to save it here.</p>
          )}
        </div>
      </div>
    </div>
  );
};
