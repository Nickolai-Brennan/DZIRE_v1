/**
 * Design System — FeatureGrid Pattern
 *
 * Displays a grid of feature/benefit cards, each with an icon, title, and description.
 */
import React from "react";
import { Card, CardBody } from "../components/Card";

export interface Feature {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  /** Optional heading displayed above the grid */
  heading?: string;
  subheading?: string;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  heading,
  subheading,
}) => {
  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className="w-full py-16 px-4 sm:px-6">
      {(heading || subheading) && (
        <div className="text-center mb-12">
          {heading && (
            <h2 className="text-3xl font-bold text-textPrimary">{heading}</h2>
          )}
          {subheading && (
            <p className="mt-3 text-textMuted max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>
      )}

      <div className={`grid ${colClass} gap-6 max-w-7xl mx-auto`}>
        {features.map((feature) => (
          <Card key={feature.id} variant="glass">
            <CardBody className="flex flex-col gap-4">
              {feature.icon && (
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {feature.icon}
                </div>
              )}
              <div>
                <h3 className="text-base font-semibold text-textPrimary">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-textMuted">
                  {feature.description}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};
