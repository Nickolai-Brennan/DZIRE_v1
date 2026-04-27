import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import {
  Crown,
  Star,
  Lock,
  CheckCircle,
  Zap,
  BookOpen,
  Heart,
} from "lucide-react";
import { track } from "../utils/track";

const VIP_FEATURES = [
  {
    icon: Zap,
    title: "Ad-Free Experience",
    desc: "Browse without interruptions",
  },
  {
    icon: BookOpen,
    title: "Exclusive Content",
    desc: "VIP-only articles, guides, and stories",
  },
  {
    icon: Crown,
    title: "Curated Playlists",
    desc: "Expert-built VIP playlists",
  },
  { icon: Star, title: "Early Access", desc: "New content before anyone else" },
  {
    icon: Heart,
    title: "Model Exclusives",
    desc: "Direct access to DZIRE Doll exclusives",
  },
  {
    icon: CheckCircle,
    title: "Priority Support",
    desc: "Fast-track customer support",
  },
];

const VIP_PLANS = [
  {
    id: "monthly",
    label: "Monthly",
    price: "$9.99",
    period: "/month",
    popular: false,
  },
  {
    id: "annual",
    label: "Annual",
    price: "$6.99",
    period: "/month",
    note: "Save 30%",
    popular: true,
  },
];

export const VipPage: React.FC = () => {
  const { isVip, upgradeToVip, isAuthenticated } = useAuth();

  const handleUpgrade = (planId: string) => {
    track("subscription_start", { plan: planId });
    upgradeToVip();
    track("upgrade_complete", { plan: planId });
  };

  if (isVip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-6">
        <Crown className="w-20 h-20 text-gold" />
        <h1 className="text-4xl font-black text-textPrimary">You're a VIP!</h1>
        <p className="text-textMuted max-w-md">
          Enjoy your exclusive access to all premium content, ad-free browsing,
          and VIP playlists.
        </p>
        <Link to="/positions">
          <Button variant="gold">Start Exploring VIP Content</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-gold/10 to-background py-20 px-4 text-center">
        <Badge variant="trophy" className="mb-4 inline-flex">
          <Crown className="w-3 h-3 mr-1" />
          DZIRE VIP
        </Badge>
        <h1 className="text-5xl md:text-7xl font-black text-textPrimary mb-4">
          Unlock the Full Experience
        </h1>
        <p className="text-xl text-textMuted max-w-2xl mx-auto mb-8">
          Premium content, ad-free browsing, curated playlists, and exclusive
          DZIRE Doll access.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-textPrimary text-center mb-10">
          What's Included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {VIP_FEATURES.map((feature) => (
            <Card key={feature.title} className="p-6">
              <feature.icon className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-bold text-textPrimary mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-textMuted">{feature.desc}</p>
            </Card>
          ))}
        </div>

        {/* Pricing */}
        <h2 className="text-3xl font-bold text-textPrimary text-center mb-10">
          Choose Your Plan
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
          {VIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`flex-1 rounded-2xl border p-8 text-center ${
                plan.popular
                  ? "border-gold bg-gold/5"
                  : "border-white/10 bg-surface"
              }`}
            >
              {plan.popular && (
                <Badge variant="trophy" className="mb-3 inline-flex">
                  Most Popular
                </Badge>
              )}
              <p className="text-lg font-bold text-textPrimary mb-1">
                {plan.label}
              </p>
              <p className="text-4xl font-black text-textPrimary">
                {plan.price}
                <span className="text-base font-normal text-textMuted">
                  {plan.period}
                </span>
              </p>
              {plan.note && (
                <p className="text-sm text-gold mt-1">{plan.note}</p>
              )}
              <div className="mt-6">
                {isAuthenticated ? (
                  <Button
                    variant={plan.popular ? "gold" : "secondary"}
                    className="w-full"
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    Get {plan.label}
                  </Button>
                ) : (
                  <Link to="/signup">
                    <Button
                      variant={plan.popular ? "gold" : "secondary"}
                      className="w-full"
                    >
                      Sign Up to Upgrade
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Locked Content Preview */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-textPrimary text-center mb-8">
            Exclusive VIP Content
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              "VIP Guide: Advanced Intimacy",
              "Expert Playlist: Comfort Collection",
              "DZIRE Doll Exclusive Interview",
            ].map((title) => (
              <div
                key={title}
                className="relative bg-surface rounded-2xl border border-white/10 p-6 overflow-hidden"
              >
                <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-gold mx-auto mb-2" />
                    <p className="text-sm font-bold text-textPrimary">
                      VIP Only
                    </p>
                  </div>
                </div>
                <p className="font-bold text-textPrimary">{title}</p>
                <p className="text-sm text-textMuted mt-1">
                  Premium content for VIP members
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
