/**
 * Preview Pages Router
 *
 * Routes for component previews and design system showcase.
 */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MagazineLayoutPreview } from "../components/previews/MagazineLayoutPreview";

export const PreviewRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/previews/magazine" replace />} />
      <Route path="/magazine" element={<MagazineLayoutPreview />} />
      {/* Additional preview routes can be added here */}
    </Routes>
  );
};

export default PreviewRoutes;
