
import React from 'react';
import { Plus, Trash2, Upload, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Element } from './types';
import { mockImages, fontFamilies } from './constants';

interface StylePanelProps {
  selectedElement: Element | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
}

export const StylePanel: React.FC<StylePanelProps> = ({
  selectedElement,
  activeTab,
  setActiveTab,
  updateElement
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="style">Style</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      
      <TabsContent value="content" className="space-y-4">
        {selectedElement && (
          <>
            {/* Content editing based on element type */}
            {(selectedElement.type === 'text' || selectedElement.type === 'heading' || selectedElement.type === 'button' || selectedElement.type === 'quote') && (
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
            
            {selectedElement.type === 'link' && (
              <>
                <div>
                  <Label>Link Text</Label>
                  <Input
                    value={selectedElement.content}
                    onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                  />
                </div>
                <div>
                  <Label>URL</Label>
                  <Input
                    value={selectedElement.link || ''}
                    onChange={(e) => updateElement(selectedElement.id, { link: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </>
            )}
            
            {selectedElement.type === 'image' && (
              <>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={selectedElement.content}
                    onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label>Alt Text</Label>
                  <Input
                    value={selectedElement.alt || ''}
                    onChange={(e) => updateElement(selectedElement.id, { alt: e.target.value })}
                    placeholder="Image description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateElement(selectedElement.id, { content: mockImages[Math.floor(Math.random() * mockImages.length)] })}
                  >
                    Random Image
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                </div>
              </>
            )}

            {selectedElement.type === 'list' && (
              <div>
                <Label>List Items</Label>
                {selectedElement.listItems?.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newItems = [...(selectedElement.listItems || [])];
                        newItems[index] = e.target.value;
                        updateElement(selectedElement.id, { listItems: newItems });
                      }}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        const newItems = selectedElement.listItems?.filter((_, i) => i !== index);
                        updateElement(selectedElement.id, { listItems: newItems });
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    const newItems = [...(selectedElement.listItems || []), 'New item'];
                    updateElement(selectedElement.id, { listItems: newItems });
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>
            )}
          </>
        )}
      </TabsContent>

      <TabsContent value="style" className="space-y-4">
        {selectedElement && (
          <>
            {/* Size controls */}
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

            {/* Background Color */}
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

            {/* Text styling for text elements */}
            {(selectedElement.type === 'text' || selectedElement.type === 'heading' || selectedElement.type === 'button' || selectedElement.type === 'quote' || selectedElement.type === 'link') && (
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
                  <Label>Font Family</Label>
                  <Select 
                    value={selectedElement.styles.fontFamily || 'Open Sans, sans-serif'} 
                    onValueChange={(value) => updateElement(selectedElement.id, {
                      styles: { ...selectedElement.styles, fontFamily: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem key={font} value={font}>{font.split(',')[0]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Label>Font Weight</Label>
                  <Select 
                    value={selectedElement.styles.fontWeight || 'normal'} 
                    onValueChange={(value) => updateElement(selectedElement.id, {
                      styles: { ...selectedElement.styles, fontWeight: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                      <SelectItem value="100">Thin</SelectItem>
                      <SelectItem value="300">Light</SelectItem>
                      <SelectItem value="500">Medium</SelectItem>
                      <SelectItem value="600">Semi Bold</SelectItem>
                      <SelectItem value="700">Bold</SelectItem>
                      <SelectItem value="900">Black</SelectItem>
                    </SelectContent>
                  </Select>
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

            {/* Spacing */}
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

            <div>
              <Label>Border</Label>
              <Input
                value={selectedElement.styles.border || ''}
                onChange={(e) => updateElement(selectedElement.id, {
                  styles: { ...selectedElement.styles, border: e.target.value }
                })}
                placeholder="1px solid #ccc"
              />
            </div>
          </>
        )}
      </TabsContent>
    </Tabs>
  );
};
