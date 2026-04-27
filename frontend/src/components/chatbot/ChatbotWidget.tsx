import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Plus } from 'lucide-react';
import { usePlaylist } from '../../context/PlaylistContext';
import { mockPositions } from '../../data/mockPositions';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  suggestions?: Array<{ id: string; title: string; slug: string }>;
}

const BOT_RESPONSES = [
  { keywords: ['beginner', 'easy', 'simple', 'start'], category: 'Beginner' },
  { keywords: ['advanced', 'difficult', 'hard', 'challenge'], category: 'Advanced' },
  { keywords: ['partner', 'couple', 'together', 'two'], category: 'Partner' },
];

function getBotReply(input: string): { text: string; suggestions: Array<{ id: string; title: string; slug: string }> } {
  const lower = input.toLowerCase();
  let category = '';
  for (const rule of BOT_RESPONSES) {
    if (rule.keywords.some(k => lower.includes(k))) {
      category = rule.category;
      break;
    }
  }

  const matches = category
    ? mockPositions.filter(p => p.category === category || p.difficulty <= 3).slice(0, 3)
    : mockPositions.filter(p => p.isFeatured).slice(0, 3);

  if (matches.length === 0) {
    return { text: "I couldn't find specific matches, but here are some popular positions:", suggestions: mockPositions.slice(0, 3).map(p => ({ id: p.id, title: p.title, slug: p.slug })) };
  }

  return {
    text: `Here are some ${category || 'recommended'} positions for you:`,
    suggestions: matches.map(p => ({ id: p.id, title: p.title, slug: p.slug })),
  };
}

export const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: "Hi! I'm your DZIRE guide. Ask me for position suggestions — try 'beginner', 'partner', or 'advanced'.",
    },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const { playlists, createPlaylist, saveToPlaylist } = usePlaylist();

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text: input };
    const reply = getBotReply(input);
    const botMsg: Message = {
      id: `b-${Date.now()}`,
      role: 'bot',
      text: reply.text,
      suggestions: reply.suggestions,
    };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleAddAll = (suggestions: Array<{ id: string; title: string; slug: string }>) => {
    let playlist = playlists[0];
    if (!playlist) playlist = createPlaylist('My Playlist');
    suggestions.forEach(s => {
      saveToPlaylist(playlist.id, {
        id: s.id,
        type: 'position',
        title: s.title,
        slug: s.slug,
      });
    });
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Open chatbot"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-surface border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary/20 px-4 py-3 border-b border-white/10">
            <p className="font-bold text-textPrimary text-sm">DZIRE Guide</p>
            <p className="text-xs text-textMuted">Your personal position assistant</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-surfaceAlt text-textPrimary'}`}>
                  <p>{msg.text}</p>
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {msg.suggestions.map(s => (
                        <a
                          key={s.id}
                          href={`/positions/${s.slug}`}
                          className="block text-xs underline hover:text-accent"
                        >
                          {s.title}
                        </a>
                      ))}
                      <button
                        onClick={() => handleAddAll(msg.suggestions!)}
                        className="flex items-center gap-1 text-xs text-primary hover:text-accent mt-1"
                      >
                        <Plus className="w-3 h-3" /> Add All to Playlist
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask for suggestions..."
              className="flex-1 bg-surfaceAlt border border-white/10 rounded-xl px-3 py-2 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
            />
            <button
              onClick={sendMessage}
              className="bg-primary text-white rounded-xl p-2 hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
