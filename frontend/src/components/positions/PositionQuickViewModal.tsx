import React, { useState, useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScoreBar } from '../ui/ScoreBar';
import { Badge } from '../ui/Badge';
import { track } from '../../utils/track';
import type { Position } from '../../data/types';

interface PositionQuickViewModalProps {
  position: Position | null;
  onClose: () => void;
}

const compatibilityQuestions = [
  { id: 'ageRange', label: 'Age Range', options: ['18-24', '25-34', '35-44', '45-54', '55+'] },
  { id: 'experience', label: 'Experience Level', options: ['Beginner', 'Intermediate', 'Experienced'] },
  { id: 'comfortPriority', label: 'Comfort Priority', options: ['High', 'Medium', 'Low'] },
  { id: 'partnerSetup', label: 'Partner Setup', options: ['Solo', 'Partner', 'Multiple'] },
];

export const PositionQuickViewModal: React.FC<PositionQuickViewModalProps> = ({ position, onClose }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!position) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [position, onClose]);

  if (!position) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Modal panel */}
      <div
        className="w-full sm:max-w-4xl bg-surface rounded-t-3xl sm:rounded-2xl border border-white/10 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 flex-shrink-0">
          <h2 className="text-xl font-bold text-textPrimary">{position.title}</h2>
          <button onClick={onClose} className="text-textMuted hover:text-textPrimary transition-colors p-1 rounded-lg hover:bg-surfaceAlt">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row">
            {/* Left Panel */}
            <div className="sm:w-2/5 flex-shrink-0 p-5 border-b sm:border-b-0 sm:border-r border-white/10">
              <img
                src={position.image}
                alt={position.title}
                className="w-full aspect-video object-cover rounded-xl mb-4"
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {position.keywords.map((kw) => (
                  <Badge key={kw} variant="default">{kw}</Badge>
                ))}
              </div>

              {position.relatedPositions.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-textMuted uppercase tracking-wider mb-2">Related Positions</p>
                  <div className="flex flex-wrap gap-2">
                    {position.relatedPositions.map((id) => (
                      <span key={id} className="text-xs text-primary border border-primary/30 px-2 py-1 rounded">{id}</span>
                    ))}
                  </div>
                </div>
              )}

              {position.relatedTerms.length > 0 && (
                <div>
                  <p className="text-xs text-textMuted uppercase tracking-wider mb-2">Dictionary Terms</p>
                  <div className="flex flex-wrap gap-2">
                    {position.relatedTerms.map((id) => (
                      <span key={id} className="text-xs text-textMuted border border-white/10 px-2 py-1 rounded">{id}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel */}
            <div className="flex-1 p-5">
              <p className="text-textMuted mb-6 leading-relaxed">{position.description}</p>

              <div className="mb-6 space-y-3">
                <h4 className="text-sm font-semibold text-textPrimary uppercase tracking-wider mb-3">Ratings</h4>
                <ScoreBar label="Comfort" value={position.comfort} color="primary" />
                <ScoreBar label="Energy" value={position.energy} color="primary" />
                <ScoreBar label="Difficulty" value={position.difficulty} color="gold" />
                <ScoreBar label="Intimacy" value={position.intimacy} color="primary" />
              </div>

              {/* Optional Compatibility Questions */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-textPrimary uppercase tracking-wider mb-1">
                  Compatibility Check
                  <span className="text-xs text-textMuted font-normal ml-2">— optional</span>
                </h4>
                <p className="text-xs text-textMuted mb-4">All questions are optional and anonymous.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {compatibilityQuestions.map((q) => (
                    <div key={q.id}>
                      <label className="text-xs text-textMuted mb-1 block">{q.label}</label>
                      <select
                        value={answers[q.id] || ''}
                        onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                        className="w-full bg-surfaceAlt border border-white/10 text-textMuted text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-primary/40"
                      >
                        <option value="">Select...</option>
                        {q.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-textMuted mt-3 italic">
                  Your selections are private and used only to refine suggestions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/positions/${position.slug}`}
                  onClick={() => {
                    track('position_full_guide_click', { positionId: position.id });
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-accent text-white rounded-xl font-semibold transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Open Full Guide
                </Link>
                <button
                  onClick={() => { track('save_position_click', { positionId: position.id }); }}
                  className="flex-1 py-3 border border-white/10 hover:border-primary/30 text-textMuted hover:text-textPrimary rounded-xl font-semibold transition-colors"
                >
                  Save Position
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
