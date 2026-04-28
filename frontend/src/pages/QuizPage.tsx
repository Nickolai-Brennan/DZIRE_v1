import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { usePlaylist } from "../context/PlaylistContext";
import { mockPositions } from "../data/mockPositions";
import { track } from "../utils/track";

const QUIZ_STEPS = [
  {
    id: "energy",
    question: "What energy level suits you best?",
    options: ["Low & relaxed", "Moderate", "High & athletic"],
  },
  {
    id: "difficulty",
    question: "How experienced are you?",
    options: ["Complete beginner", "Some experience", "Advanced"],
  },
  {
    id: "focus",
    question: "What do you want to focus on?",
    options: ["Deep intimacy", "Physical pleasure", "Exploration & novelty"],
  },
];

export const QuizPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);
  const { playlists, createPlaylist, saveToPlaylist } = usePlaylist();
  const navigate = useNavigate();

  const currentStep = QUIZ_STEPS[step];

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentStep.id]: answer };
    setAnswers(newAnswers);
    if (step < QUIZ_STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setComplete(true);
      track("quiz_complete", { answers: newAnswers });
    }
  };

  const getPersonalisedPositions = () => {
    let filtered = [...mockPositions];
    if (answers.energy === "Low & relaxed")
      filtered = filtered.filter((p) => p.energy <= 4);
    if (answers.energy === "High & athletic")
      filtered = filtered.filter((p) => p.energy >= 7);
    if (answers.difficulty === "Complete beginner")
      filtered = filtered.filter((p) => p.difficulty <= 3);
    if (answers.difficulty === "Advanced")
      filtered = filtered.filter((p) => p.difficulty >= 7);
    return filtered.slice(0, 6);
  };

  const handleSaveAsPlaylist = () => {
    const positions = getPersonalisedPositions();
    let playlist = playlists.find((p) => p.name === "My Style Results");
    if (!playlist) playlist = createPlaylist("My Style Results");
    positions.forEach((p) => {
      saveToPlaylist(playlist!.id, {
        id: p.id,
        type: "position",
        title: p.title,
        slug: p.slug,
        image: p.image,
      });
    });
    track("playlist_create", { from: "quiz" });
    navigate("/playlists");
  };

  if (complete) {
    const results = getPersonalisedPositions();
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary text-sm uppercase tracking-widest mb-3">
              Your Style
            </p>
            <h1 className="text-4xl font-black text-textPrimary mb-3">
              Personalised Results
            </h1>
            <p className="text-textMuted">
              Based on your answers, here are the best positions for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {results.map((p) => (
              <a
                key={p.id}
                href={`/positions/${p.slug}`}
                className="bg-surface rounded-2xl border border-white/10 overflow-hidden hover:border-primary/30 transition-colors"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-4">
                  <p className="font-bold text-textPrimary text-sm">
                    {p.title}
                  </p>
                  <p className="text-xs text-textMuted mt-1">
                    Difficulty: {p.difficulty}/10
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="primary" onClick={handleSaveAsPlaylist}>
              Save as Playlist
            </Button>
            <Button variant="secondary" onClick={() => navigate("/positions")}>
              Browse All
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <p className="text-primary text-sm uppercase tracking-widest mb-3">
            Find Your Style
          </p>
          <h1 className="text-3xl font-black text-textPrimary mb-2">
            Question {step + 1} of {QUIZ_STEPS.length}
          </h1>
          <div className="flex gap-1 justify-center mt-3">
            {QUIZ_STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full flex-1 max-w-12 transition-colors ${i <= step ? "bg-primary" : "bg-white/10"}`}
              />
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-white/10 p-8">
          <h2 className="text-xl font-bold text-textPrimary mb-6">
            {currentStep.question}
          </h2>
          <div className="space-y-3">
            {currentStep.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full text-left px-5 py-4 rounded-xl border border-white/10 bg-surfaceAlt hover:border-primary/50 hover:bg-surface text-textPrimary transition-all"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
