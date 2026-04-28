import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-white/8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-textPrimary font-bold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/positions"
                  className="text-textMuted hover:text-primary transition-colors text-sm"
                >
                  Positions
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="text-textMuted hover:text-primary transition-colors text-sm"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/dictionary"
                  className="text-textMuted hover:text-primary transition-colors text-sm"
                >
                  Dictionary
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-textPrimary font-bold mb-4">Content</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dzire-dolls"
                  className="text-textMuted hover:text-primary transition-colors text-sm"
                >
                  DZIRE Dolls
                </Link>
              </li>
              <li>
                <Link
                  to="/stories"
                  className="text-textMuted hover:text-primary transition-colors text-sm"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/magazine"
                  className="text-textMuted hover:text-primary transition-colors text-sm"
                >
                  Magazine
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-textPrimary font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/newsletter"
                  className="text-textMuted hover:text-primary transition-colors text-sm"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  to="/vip"
                  className="text-textMuted hover:text-primary transition-colors text-sm"
                >
                  VIP Access
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-textMuted hover:text-primary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-textPrimary font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-textMuted hover:text-primary transition-colors text-sm"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-textMuted hover:text-primary transition-colors text-sm"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/8">
          <p className="text-center text-textMuted text-sm">
            © 2024 DZIRE. All rights reserved. Adults only (18+).
          </p>
        </div>
      </div>
    </footer>
  );
};
