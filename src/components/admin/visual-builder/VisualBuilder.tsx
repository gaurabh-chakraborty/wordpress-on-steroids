
import React, { useState, useCallback, useRef } from 'react';
import { Element } from './types';
import { ElementRenderer } from './ElementRenderer';
import { ElementSidebar } from './ElementSidebar';
import { StylePanel } from './StylePanel';
import { Toolbar } from './Toolbar';
import { useToast } from '@/hooks/use-toast';

export const VisualBuilder: React.FC = () => {
  const { toast } = useToast();
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [history, setHistory] = useState<Element[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('content');
  const canvasRef = useRef<HTMLDivElement>(null);

  const addToHistory = useCallback((newElements: Element[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
      setSelectedElement(null);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
      setSelectedElement(null);
    }
  }, [history, historyIndex]);

  const addElement = useCallback((type: Element['type']) => {
    const newElement: Element = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      styles: {},
      position: { x: 50, y: 50 },
      size: { width: 200, height: 100 },
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(newElement);

    toast({
      title: "Element Added",
      description: `${type} element has been added to your design.`,
    });
  }, [elements, addToHistory, toast]);

  const updateElement = useCallback((id: string, updates: Partial<Element>) => {
    const newElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
    addToHistory(newElements);
    
    if (selectedElement?.id === id) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [elements, selectedElement, addToHistory]);

  const deleteElement = useCallback((id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(null);

    toast({
      title: "Element Deleted",
      description: "The element has been removed from your design.",
    });
  }, [elements, addToHistory, toast]);

  const handleElementClick = useCallback((elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (element) {
      setSelectedElement(element);
    }
  }, [elements]);

  const saveDesign = useCallback(() => {
    const designData = {
      elements,
      viewport,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('visual-builder-design', JSON.stringify(designData));
    
    toast({
      title: "Design Saved",
      description: "Your design has been saved successfully.",
    });
  }, [elements, viewport, toast]);

  const getDefaultContent = (type: Element['type']): string => {
    switch (type) {
      case 'text': return 'Sample text';
      case 'heading': return 'Heading';
      case 'button': return 'Button';
      case 'image': return 'https://via.placeholder.com/200x100';
      case 'video': return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      case 'link': return 'Link text';
      case 'list': return 'List item';
      case 'quote': return 'Quote text';
      default: return '';
    }
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
      default: return '100%';
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <ElementSidebar 
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        addElement={addElement}
        updateElement={updateElement}
      />
      
      <div className="flex-1 flex flex-col">
        <Toolbar
          viewport={viewport}
          setViewport={setViewport}
          undo={undo}
          redo={redo}
          saveDesign={saveDesign}
          historyIndex={historyIndex}
          historyLength={history.length}
        />
        
        <div className="flex-1 p-8 overflow-auto">
          <div 
            ref={canvasRef}
            className="mx-auto bg-white shadow-lg min-h-96 relative"
            style={{ 
              width: getViewportWidth(),
              maxWidth: '100%',
              transition: 'width 0.3s ease'
            }}
            onClick={() => setSelectedElement(null)}
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
                  handleElementClick(element.id);
                }}
              >
                <ElementRenderer element={element} />
                {selectedElement?.id === element.id && (
                  <button
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteElement(element.id);
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
      </div>
    </div>
  );
};
