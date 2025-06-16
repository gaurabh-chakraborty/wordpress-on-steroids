import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  Save,
  Plus,
  Trash2,
  Copy,
  Settings,
  Move,
  RotateCcw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Columns,
  Grid3X3,
  Video,
  Play
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface ElementStyle {
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  opacity?: number;
  transform?: string;
  boxShadow?: string;
  zIndex?: number;
}

interface Element {
  id: string;
  type: 'text' | 'image' | 'button' | 'container' | 'video' | 'divider' | 'spacer' | 'column';
  content: string;
  styles: ElementStyle;
  position: { x: number; y: number };
  size: { width: number; height: number };
  children?: Element[];
}

interface ResizeHandle {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right';
  cursor: string;
}

const resizeHandles: ResizeHandle[] = [
  { position: 'top-left', cursor: 'nw-resize' },
  { position: 'top-right', cursor: 'ne-resize' },
  { position: 'bottom-left', cursor: 'sw-resize' },
  { position: 'bottom-right', cursor: 'se-resize' },
  { position: 'top', cursor: 'n-resize' },
  { position: 'bottom', cursor: 's-resize' },
  { position: 'left', cursor: 'w-resize' },
  { position: 'right', cursor: 'e-resize' }
];

export const VisualBuilder = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('content');
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number; width: number; height: number; handle: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; elementX: number; elementY: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [elements, setElements] = useState<Element[]>([
    {
      id: '1',
      type: 'text',
      content: 'Welcome to Your Website',
      styles: { 
        fontSize: '32px', 
        fontWeight: 'bold', 
        color: '#1f2937',
        textAlign: 'center',
        padding: '20px'
      },
      position: { x: 50, y: 50 },
      size: { width: 400, height: 80 }
    }
  ]);

  const elementTypes = [
    { type: 'text', label: 'Text', icon: Type },
    { type: 'image', label: 'Image', icon: Image },
    { type: 'button', label: 'Button', icon: Square },
    { type: 'container', label: 'Container', icon: Layout },
    { type: 'video', label: 'Video', icon: Video },
    { type: 'divider', label: 'Divider', icon: Grid3X3 },
    { type: 'spacer', label: 'Spacer', icon: Move },
    { type: 'column', label: 'Column', icon: Columns }
  ];

  const viewportSizes = [
    { key: 'desktop', label: 'Desktop', icon: Monitor },
    { key: 'tablet', label: 'Tablet', icon: Tablet },
    { key: 'mobile', label: 'Mobile', icon: Smartphone }
  ];

  // Mouse event handlers for resizing
  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string, handle?: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    if (handle) {
      setIsResizing(true);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: element.size.width,
        height: element.size.height,
        handle
      });
    } else {
      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        elementX: element.position.x,
        elementY: element.position.y
      });
    }
  }, [elements]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing && resizeStart && selectedElement) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = selectedElement.position.x;
      let newY = selectedElement.position.y;

      switch (resizeStart.handle) {
        case 'bottom-right':
          newWidth = Math.max(20, resizeStart.width + deltaX);
          newHeight = Math.max(20, resizeStart.height + deltaY);
          break;
        case 'bottom-left':
          newWidth = Math.max(20, resizeStart.width - deltaX);
          newHeight = Math.max(20, resizeStart.height + deltaY);
          newX = selectedElement.position.x + deltaX;
          break;
        case 'top-right':
          newWidth = Math.max(20, resizeStart.width + deltaX);
          newHeight = Math.max(20, resizeStart.height - deltaY);
          newY = selectedElement.position.y + deltaY;
          break;
        case 'top-left':
          newWidth = Math.max(20, resizeStart.width - deltaX);
          newHeight = Math.max(20, resizeStart.height - deltaY);
          newX = selectedElement.position.x + deltaX;
          newY = selectedElement.position.y + deltaY;
          break;
        case 'right':
          newWidth = Math.max(20, resizeStart.width + deltaX);
          break;
        case 'left':
          newWidth = Math.max(20, resizeStart.width - deltaX);
          newX = selectedElement.position.x + deltaX;
          break;
        case 'bottom':
          newHeight = Math.max(20, resizeStart.height + deltaY);
          break;
        case 'top':
          newHeight = Math.max(20, resizeStart.height - deltaY);
          newY = selectedElement.position.y + deltaY;
          break;
      }

      updateElement(selectedElement.id, {
        size: { width: newWidth, height: newHeight },
        position: { x: Math.max(0, newX), y: Math.max(0, newY) }
      });
    } else if (isDragging && dragStart && selectedElement) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      updateElement(selectedElement.id, {
        position: { 
          x: Math.max(0, dragStart.elementX + deltaX), 
          y: Math.max(0, dragStart.elementY + deltaY) 
        }
      });
    }
  }, [isResizing, isDragging, resizeStart, dragStart, selectedElement]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setIsDragging(false);
    setResizeStart(null);
    setDragStart(null);
  }, []);

  useEffect(() => {
    if (isResizing || isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, isDragging, handleMouseMove, handleMouseUp]);

  const addElement = useCallback((type: Element['type']) => {
    const newElement: Element = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'New Text Element' : 
               type === 'button' ? 'Click Me' : 
               type === 'divider' ? '' : 
               type === 'spacer' ? '' : '',
      styles: { 
        fontSize: type === 'text' ? '16px' : undefined,
        color: type === 'text' ? '#1f2937' : undefined,
        backgroundColor: type === 'button' ? '#3b82f6' : 
                        type === 'container' ? '#f3f4f6' : undefined,
        padding: type === 'container' ? '20px' : 
                type === 'button' ? '12px 24px' : undefined,
        borderRadius: type === 'button' ? '6px' : undefined
      },
      position: { x: 100, y: 200 },
      size: { 
        width: type === 'text' ? 200 : 
               type === 'button' ? 120 : 
               type === 'container' ? 300 : 
               type === 'divider' ? 100 : 
               type === 'spacer' ? 100 : 250, 
        height: type === 'text' ? 40 : 
                type === 'button' ? 40 : 
                type === 'container' ? 200 : 
                type === 'divider' ? 2 : 
                type === 'spacer' ? 50 : 150 
      }
    };
    setElements(prev => [...prev, newElement]);
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<Element>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
    
    // Update selected element if it's the one being updated
    if (selectedElement?.id === id) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedElement]);

  const deleteElement = useCallback((id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  }, []);

  const duplicateElement = useCallback((id: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const newElement = {
        ...element,
        id: Date.now().toString(),
        position: { x: element.position.x + 20, y: element.position.y + 20 }
      };
      setElements(prev => [...prev, newElement]);
    }
  }, [elements]);

  const handleDragStart = (e: React.DragEvent, elementId: string) => {
    setDraggedElement(elementId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateElement(draggedElement, {
      position: { x: Math.max(0, x), y: Math.max(0, y) }
    });
    setDraggedElement(null);
  };

  const ResizeHandles = ({ element }: { element: Element }) => {
    if (!selectedElement || selectedElement.id !== element.id) return null;

    return (
      <>
        {resizeHandles.map((handle) => {
          const getHandleStyle = (): React.CSSProperties => {
            const baseStyle: React.CSSProperties = {
              position: 'absolute',
              width: '8px',
              height: '8px',
              backgroundColor: '#3b82f6',
              border: '1px solid #ffffff',
              cursor: handle.cursor,
              zIndex: 1000
            };

            switch (handle.position) {
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
            <div
              key={handle.position}
              style={getHandleStyle()}
              onMouseDown={(e) => handleMouseDown(e, element.id, handle.position)}
            />
          );
        })}
      </>
    );
  };

  const StylePanel = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="style">Style</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      
      <TabsContent value="content" className="space-y-4">
        {selectedElement && (
          <>
            {(selectedElement.type === 'text' || selectedElement.type === 'button') && (
              <div>
                <Label>Content</Label>
                <textarea
                  value={selectedElement.content}
                  onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                  className="w-full p-2 text-sm border rounded resize-none"
                  rows={3}
                />
              </div>
            )}
            
            {selectedElement.type === 'image' && (
              <div>
                <Label>Image URL</Label>
                <Input
                  value={selectedElement.content}
                  onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}
          </>
        )}
      </TabsContent>

      <TabsContent value="style" className="space-y-4">
        {selectedElement && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Width</Label>
                <Input
                  value={selectedElement.size.width}
                  onChange={(e) => updateElement(selectedElement.id, {
                    size: { ...selectedElement.size, width: parseInt(e.target.value) || 0 }
                  })}
                  type="number"
                />
              </div>
              <div>
                <Label>Height</Label>
                <Input
                  value={selectedElement.size.height}
                  onChange={(e) => updateElement(selectedElement.id, {
                    size: { ...selectedElement.size, height: parseInt(e.target.value) || 0 }
                  })}
                  type="number"
                />
              </div>
            </div>

            <div>
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={selectedElement.styles.backgroundColor || '#ffffff'}
                  onChange={(e) => updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, backgroundColor: e.target.value }
                  })}
                  className="w-16 h-10"
                />
                <Input
                  value={selectedElement.styles.backgroundColor || ''}
                  onChange={(e) => updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, backgroundColor: e.target.value }
                  })}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            {(selectedElement.type === 'text' || selectedElement.type === 'button') && (
              <>
                <div>
                  <Label>Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={selectedElement.styles.color || '#000000'}
                      onChange={(e) => updateElement(selectedElement.id, {
                        styles: { ...selectedElement.styles, color: e.target.value }
                      })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={selectedElement.styles.color || ''}
                      onChange={(e) => updateElement(selectedElement.id, {
                        styles: { ...selectedElement.styles, color: e.target.value }
                      })}
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div>
                  <Label>Font Size</Label>
                  <Input
                    value={selectedElement.styles.fontSize?.replace('px', '') || '16'}
                    onChange={(e) => updateElement(selectedElement.id, {
                      styles: { ...selectedElement.styles, fontSize: e.target.value + 'px' }
                    })}
                    type="number"
                  />
                </div>

                <div>
                  <Label>Text Align</Label>
                  <div className="flex gap-1">
                    <Button
                      variant={selectedElement.styles.textAlign === 'left' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateElement(selectedElement.id, {
                        styles: { ...selectedElement.styles, textAlign: 'left' }
                      })}
                    >
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={selectedElement.styles.textAlign === 'center' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateElement(selectedElement.id, {
                        styles: { ...selectedElement.styles, textAlign: 'center' }
                      })}
                    >
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={selectedElement.styles.textAlign === 'right' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateElement(selectedElement.id, {
                        styles: { ...selectedElement.styles, textAlign: 'right' }
                      })}
                    >
                      <AlignRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            <div>
              <Label>Padding</Label>
              <Input
                value={selectedElement.styles.padding?.replace('px', '') || '0'}
                onChange={(e) => updateElement(selectedElement.id, {
                  styles: { ...selectedElement.styles, padding: e.target.value + 'px' }
                })}
                placeholder="20"
              />
            </div>

            <div>
              <Label>Border Radius</Label>
              <Input
                value={selectedElement.styles.borderRadius?.replace('px', '') || '0'}
                onChange={(e) => updateElement(selectedElement.id, {
                  styles: { ...selectedElement.styles, borderRadius: e.target.value + 'px' }
                })}
                placeholder="0"
              />
            </div>
          </>
        )}
      </TabsContent>

      <TabsContent value="advanced" className="space-y-4">
        {selectedElement && (
          <>
            <div>
              <Label>Opacity</Label>
              <Slider
                value={[selectedElement.styles.opacity || 1]}
                onValueChange={([value]) => updateElement(selectedElement.id, {
                  styles: { ...selectedElement.styles, opacity: value }
                })}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <Label>Box Shadow</Label>
              <Input
                value={selectedElement.styles.boxShadow || ''}
                onChange={(e) => updateElement(selectedElement.id, {
                  styles: { ...selectedElement.styles, boxShadow: e.target.value }
                })}
                placeholder="0 4px 6px rgba(0,0,0,0.1)"
              />
            </div>

            <div>
              <Label>Z-Index</Label>
              <Input
                value={selectedElement.styles.zIndex || 0}
                onChange={(e) => updateElement(selectedElement.id, {
                  styles: { ...selectedElement.styles, zIndex: parseInt(e.target.value) || 0 }
                })}
                type="number"
              />
            </div>
          </>
        )}
      </TabsContent>
    </Tabs>
  );

  const renderElement = (element: Element) => {
    const isSelected = selectedElement?.id === element.id;
    
    const elementStyle: React.CSSProperties = {
      position: 'absolute',
      left: element.position.x,
      top: element.position.y,
      width: element.size.width,
      height: element.size.height,
      cursor: isDragging ? 'grabbing' : 'grab',
      border: isSelected ? '2px solid #3b82f6' : '1px solid transparent',
      ...element.styles
    };

    return (
      <div
        key={element.id}
        className={`group relative ${isSelected ? 'ring-2 ring-blue-500' : ''} hover:ring-2 hover:ring-blue-300 transition-all`}
        style={elementStyle}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(element);
        }}
        onMouseDown={(e) => {
          if (!isSelected) {
            setSelectedElement(element);
          }
          handleMouseDown(e, element.id);
        }}
        draggable
        onDragStart={(e) => handleDragStart(e, element.id)}
      >
        {element.type === 'text' && (
          <div style={{ ...element.styles, width: '100%', height: '100%' }}>
            {element.content}
          </div>
        )}
        
        {element.type === 'button' && (
          <button 
            className="w-full h-full rounded transition-colors hover:opacity-90"
            style={element.styles}
          >
            {element.content}
          </button>
        )}
        
        {element.type === 'image' && (
          <img
            src={element.content || 'https://via.placeholder.com/300x200'}
            alt="Element"
            className="w-full h-full object-cover"
            style={element.styles}
          />
        )}
        
        {element.type === 'container' && (
          <div 
            className="w-full h-full border-2 border-dashed border-gray-300"
            style={element.styles}
          >
            <div className="flex items-center justify-center h-full text-gray-500">
              Container
            </div>
          </div>
        )}

        {element.type === 'divider' && (
          <hr 
            className="w-full border-gray-300"
            style={element.styles}
          />
        )}

        {element.type === 'spacer' && (
          <div 
            className="w-full bg-gray-100 border border-dashed border-gray-300"
            style={element.styles}
          />
        )}

        <ResizeHandles element={element} />

        {isSelected && (
          <div className="absolute -top-8 -right-2 flex space-x-1 z-50">
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                duplicateElement(element.id);
              }}
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                deleteElement(element.id);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar - Elements & Properties */}
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
                  className="flex flex-col items-center p-3 h-auto"
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
            <StylePanel />
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
            ref={canvasRef}
            className={`mx-auto bg-white shadow-lg min-h-96 relative ${
              viewport === 'desktop' ? 'max-w-full' :
              viewport === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
            }`}
            style={{ 
              transition: 'max-width 0.3s ease',
              minHeight: '600px',
              position: 'relative',
              userSelect: 'none'
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => setSelectedElement(null)}
          >
            {elements.map(renderElement)}

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
