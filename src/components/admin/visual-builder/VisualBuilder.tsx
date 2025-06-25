
import React, { useState, useCallback } from 'react';
import { ElementSidebar } from './ElementSidebar';
import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';
import { useElementManager } from './hooks/useElementManager';
import { useToast } from '@/hooks/use-toast';

export const VisualBuilder: React.FC = () => {
  const { toast } = useToast();
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('content');

  const {
    elements,
    selectedElement,
    setSelectedElement,
    addElement,
    updateElement,
    deleteElement,
    handleElementClick,
    undo,
    redo,
    historyIndex,
    historyLength
  } = useElementManager();

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
          historyLength={historyLength}
        />
        
        <Canvas
          elements={elements}
          selectedElement={selectedElement}
          viewport={viewport}
          onElementClick={handleElementClick}
          onDeleteElement={deleteElement}
          onDeselectAll={() => setSelectedElement(null)}
        />
      </div>
    </div>
  );
};
