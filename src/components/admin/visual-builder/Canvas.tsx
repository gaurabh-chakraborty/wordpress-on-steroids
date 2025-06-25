
import React, { useRef } from 'react';
import { Element } from './types';
import { ElementRenderer } from './ElementRenderer';

interface CanvasProps {
  elements: Element[];
  selectedElement: Element | null;
  viewport: 'desktop' | 'tablet' | 'mobile';
  onElementClick: (elementId: string) => void;
  onDeleteElement: (id: string) => void;
  onDeselectAll: () => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  elements,
  selectedElement,
  viewport,
  onElementClick,
  onDeleteElement,
  onDeselectAll
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
      default: return '100%';
    }
  };

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div 
        ref={canvasRef}
        className="mx-auto bg-white shadow-lg min-h-96 relative"
        style={{ 
          width: getViewportWidth(),
          maxWidth: '100%',
          transition: 'width 0.3s ease'
        }}
        onClick={onDeselectAll}
      >
        {elements.map(element => (
          <div
            key={element.id}
            className={`absolute cursor-pointer ${selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              left: element.position.x,
              top: element.position.y,
              width: element.size.width,
              height: element.size.height,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onElementClick(element.id);
            }}
          >
            <ElementRenderer element={element} />
            {selectedElement?.id === element.id && (
              <button
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteElement(element.id);
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-2">Start Building</p>
              <p className="text-sm">Drag elements from the sidebar to begin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
