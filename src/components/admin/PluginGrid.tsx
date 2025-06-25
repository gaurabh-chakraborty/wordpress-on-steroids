
import React from 'react';
import { Puzzle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Plugin } from '@/types/admin';
import { PluginCard } from './PluginCard';

interface PluginGridProps {
  plugins: Plugin[];
  searchTerm: string;
  activeTab: 'installed' | 'available';
  onToggle: (id: string) => void;
  onInstall: (plugin: Plugin) => void;
  onSettings: (plugin: Plugin) => void;
}

export const PluginGrid = ({ 
  plugins, 
  searchTerm, 
  activeTab, 
  onToggle, 
  onInstall, 
  onSettings 
}: PluginGridProps) => {
  if (plugins.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Puzzle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No plugins found</h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Try adjusting your search criteria.'
              : `No ${activeTab} plugins available.`
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plugins.map((plugin) => (
        <PluginCard
          key={plugin.id}
          plugin={plugin}
          onToggle={onToggle}
          onInstall={onInstall}
          onSettings={onSettings}
        />
      ))}
    </div>
  );
};
