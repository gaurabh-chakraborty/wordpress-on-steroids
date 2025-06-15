
import React, { useState } from 'react';
import { 
  Palette, 
  Square, 
  Type, 
  Image, 
  Layout, 
  MousePointer,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Undo,
  Redo,
  Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Element {
  id: string;
  type: 'text' | 'image' | 'button' | 'container';
  content: string;
  styles: Record<string, string>;
  position: { x: number; y: number };
}

export const VisualBuilder = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [elements, setElements] = useState<Element[]>([
    {
      id: '1',
      type: 'text',
      content: 'Welcome to Your Website',
      styles: { fontSize: '32px', fontWeight: 'bold', color: '#1f2937' },
      position: { x: 50, y: 50 }
    },
    {
      id: '2',
      type: 'text',
      content: 'This is a sample paragraph that you can edit and customize.',
      styles: { fontSize: '16px', color: '#6b7280' },
      position: { x: 50, y: 120 }
    }
  ]);

  const elementTypes = [
    { type: 'text', label: 'Text', icon: Type },
    { type: 'image', label: 'Image', icon: Image },
    { type: 'button', label: 'Button', icon: Square },
    { type: 'container', label: 'Container', icon: Layout }
  ];

  const viewportSizes = [
    { key: 'desktop', label: 'Desktop', icon: Monitor },
    { key: 'tablet', label: 'Tablet', icon: Tablet },
    { key: 'mobile', label: 'Mobile', icon: Smartphone }
  ];

  const addElement = (type: Element['type']) => {
    const newElement: Element = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'New Text Element' : type === 'button' ? 'Click Me' : '',
      styles: { fontSize: '16px', color: '#1f2937' },
      position: { x: 100, y: 200 }
    };
    setElements(prev => [...prev, newElement]);
  };

  const updateElement = (id: string, updates: Partial<Element>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar - Elements & Properties */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Visual Builder</h2>
          <p className="text-sm text-gray-600">Drag and drop to build your page</p>
        </div>

        {/* Elements Panel */}
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
                  className="flex flex-col items-center p-3 h-auto"
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{elementType.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Properties Panel */}
        {selectedElement && (
          <div className="flex-1 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Properties</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={selectedElement.content}
                  onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                  className="w-full p-2 text-sm border border-gray-300 rounded resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Font Size
                </label>
                <input
                  type="text"
                  value={selectedElement.styles.fontSize || '16px'}
                  onChange={(e) => updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, fontSize: e.target.value }
                  })}
                  className="w-full p-2 text-sm border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="color"
                  value={selectedElement.styles.color || '#1f2937'}
                  onChange={(e) => updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, color: e.target.value }
                  })}
                  className="w-full h-10 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Redo className="w-4 h-4" />
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
              <Button size="sm">
                <Save className="w-4 h-4" />
                <span className="ml-1">Save</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-8 overflow-auto">
          <div 
            className={`mx-auto bg-white shadow-lg min-h-96 relative ${
              viewport === 'desktop' ? 'max-w-full' :
              viewport === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
            }`}
            style={{ transition: 'max-width 0.3s ease' }}
          >
            {elements.map((element) => (
              <div
                key={element.id}
                className={`absolute cursor-pointer hover:ring-2 hover:ring-blue-500 ${
                  selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{
                  left: element.position.x,
                  top: element.position.y,
                  ...element.styles
                }}
                onClick={() => setSelectedElement(element)}
              >
                {element.type === 'text' && (
                  <span>{element.content}</span>
                )}
                {element.type === 'button' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    {element.content}
                  </button>
                )}
                {element.type === 'image' && (
                  <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                {element.type === 'container' && (
                  <div className="w-64 h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                    <span className="text-gray-500">Container</span>
                  </div>
                )}
              </div>
            ))}

            {elements.length === 0 && (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <Palette className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Start building by adding elements from the sidebar</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
