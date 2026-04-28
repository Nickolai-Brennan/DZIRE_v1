/**
 * frontend/src/admin/social-size-chart/TemplateDownloadButton.tsx
 * Button to download or open a social media template file.
 */
import React from "react";

export interface TemplateDownloadButtonProps {
  templatePath: string;
  platform: string;
  assetType: string;
}

export const TemplateDownloadButton: React.FC<TemplateDownloadButtonProps> = ({
  templatePath,
  platform,
  assetType,
}) => {
  if (!templatePath) return null;
  const href = `/social-templates/${templatePath}`;
  return (
    <a
      href={href}
      download
      title={`Download ${platform} ${assetType} template`}
      className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 hover:bg-white/10 text-textMuted hover:text-textPrimary rounded text-xs transition-colors border border-white/10"
    >
      ⬇ Template
    </a>
  );
};
