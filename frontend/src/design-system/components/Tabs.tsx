import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, className = '' }) => {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? '');

  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div className={className}>
      <div role="tablist" className="flex border-b border-white/10 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={`flex-shrink-0 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              active === tab.id
                ? 'text-primary border-primary'
                : 'text-textMuted border-transparent hover:text-textPrimary hover:border-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          className="pt-4"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
};
