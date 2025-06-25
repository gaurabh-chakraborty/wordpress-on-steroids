
import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plugin } from '@/types/admin';

interface PluginTabsProps {
  activeTab: 'installed' | 'available';
  onTabChange: (tab: 'installed' | 'available') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  installedCount: number;
  availableCount: number;
}

export const PluginTabs = ({ 
  activeTab, 
  onTabChange, 
  searchTerm, 
  onSearchChange, 
  installedCount, 
  availableCount 
}: PluginTabsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            <Button
              variant={activeTab === 'installed' ? 'default' : 'ghost'}
              onClick={() => onTabChange('installed')}
              className="px-4 py-2"
            >
              Installed ({installedCount})
            </Button>
            <Button
              variant={activeTab === 'available' ? 'default' : 'ghost'}
              onClick={() => onTabChange('available')}
              className="px-4 py-2"
            >
              Available ({availableCount})
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search plugins..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
