
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Element } from './types';
import { elementTypes } from './constants';
import { StylePanel } from './StylePanel';

interface ElementSidebarProps {
  selectedElement: Element | null;
  setSelectedElement: (element: Element | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  addElement: (type: Element['type']) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
}

export const ElementSidebar: React.FC<ElementSidebarProps> = ({
  selectedElement,
  setSelectedElement,
  activeTab,
  setActiveTab,
  addElement,
  updateElement
}) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Visual Builder</h2>
        <p className="text-sm text-gray-600">Drag and drop to build your page</p>
      </div>

      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Elements</h3>
        <div className="grid grid-cols-2 gap-2">
          {elementTypes.map((elementType) => {
            const Icon = elementType.icon;
            return (
              <Button
                key={elementType.type}
                variant="outline"
                onClick={() => addElement(elementType.type as Element['type'])}
                className="flex flex-col items-center p-3 h-auto hover:bg-blue-50"
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{elementType.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {selectedElement ? (
        <div className="flex-1 p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">Properties</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedElement(null)}
            >
              ×
            </Button>
          </div>
          <StylePanel 
            selectedElement={selectedElement}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            updateElement={updateElement}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center text-gray-500">
            <Settings className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Select an element to edit its properties</p>
          </div>
        </div>
      )}
    </div>
  );
};
