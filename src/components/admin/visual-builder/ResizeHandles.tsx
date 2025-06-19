
import React from 'react';
import { Element } from './types';
import { resizeHandles } from './constants';

interface ResizeHandlesProps {
  element: Element;
  selectedElement: Element | null;
  onMouseDown: (e: React.MouseEvent, elementId: string, handle?: string) => void;
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({ 
  element, 
  selectedElement, 
  onMouseDown 
}) => {
  if (!selectedElement || selectedElement.id !== element.id) return null;

  const getHandleStyle = (position: string): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      width: '8px',
      height: '8px',
      backgroundColor: '#3b82f6',
      border: '1px solid #ffffff',
      cursor: resizeHandles.find(h => h.position === position)?.cursor || 'default',
      zIndex: 1000
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyle, top: -4, left: -4 };
      case 'top-right':
        return { ...baseStyle, top: -4, right: -4 };
      case 'bottom-left':
        return { ...baseStyle, bottom: -4, left: -4 };
      case 'bottom-right':
        return { ...baseStyle, bottom: -4, right: -4 };
      case 'top':
        return { ...baseStyle, top: -4, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { ...baseStyle, bottom: -4, left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { ...baseStyle, left: -4, top: '50%', transform: 'translateY(-50%)' };
      case 'right':
        return { ...baseStyle, right: -4, top: '50%', transform: 'translateY(-50%)' };
      default:
        return baseStyle;
    }
  };

  return (
    <>
      {resizeHandles.map((handle) => (
        <div
          key={handle.position}
          style={getHandleStyle(handle.position)}
          onMouseDown={(e) => onMouseDown(e, element.id, handle.position)}
        />
      ))}
    </>
  );
};
