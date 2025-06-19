
import React from 'react';
import { Undo, Redo, RotateCcw, Eye, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { viewportSizes } from './constants';

interface ToolbarProps {
  viewport: 'desktop' | 'tablet' | 'mobile';
  setViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  undo: () => void;
  redo: () => void;
  saveDesign: () => void;
  historyIndex: number;
  historyLength: number;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  viewport,
  setViewport,
  undo,
  redo,
  saveDesign,
  historyIndex,
  historyLength
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={undo}
            disabled={hist}
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={redo}
            disabled={historyIndex >= historyLength - 1}
          >
            <Redo className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {viewportSizes.map((size) => {
            const Icon = size.icon;
            return (
              <Button
                key={size.key}
                variant={viewport === size.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewport(size.key as any)}
              >
                <Icon className="w-4 h-4" />
              </Button>
            );
          })}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
            <span className="ml-1">Preview</span>
          </Button>
          <Button size="sm" onClick={saveDesign}>
            <Save className="w-4 h-4" />
            <span className="ml-1">Save</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
