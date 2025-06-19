import React, { useState, useCallback } from 'react';
import { 
  Plus, 
  Settings, 
  Trash2, 
  Copy, 
  Eye,
  Save,
  Undo,
  Redo,
  Grid,
  Type,
  Image,
  Square,
  Calendar,
  CheckSquare,
  ToggleLeft,
  Sliders as SliderIcon,
  Minus as SeparatorIcon,
  Table as TableIcon,
  Layout,
  Menu,
  Navigation,
  Smartphone,
  Tablet,
  Monitor,
  Users,
  BarChart3,
  Star,
  Bell,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ComponentElement {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  styles: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
  children?: ComponentElement[];
}

const shadcnComponents = [
  { type: 'accordion', name: 'Accordion', icon: Layout, category: 'layout' },
  { type: 'alert', name: 'Alert', icon: Bell, category: 'feedback' },
  { type: 'alert-dialog', name: 'Alert Dialog', icon: Square, category: 'overlay' },
  { type: 'avatar', name: 'Avatar', icon: Users, category: 'display' },
  { type: 'badge', name: 'Badge', icon: Star, category: 'display' },
  { type: 'breadcrumb', name: 'Breadcrumb', icon: Navigation, category: 'navigation' },
  { type: 'button', name: 'Button', icon: Square, category: 'input' },
  { type: 'calendar', name: 'Calendar', icon: Calendar, category: 'input' },
  { type: 'card', name: 'Card', icon: Layout, category: 'layout' },
  { type: 'chart', name: 'Chart', icon: BarChart3, category: 'display' },
  { type: 'checkbox', name: 'Checkbox', icon: CheckSquare, category: 'input' },
  { type: 'collapsible', name: 'Collapsible', icon: Layout, category: 'layout' },
  { type: 'input', name: 'Input', icon: Type, category: 'input' },
  { type: 'label', name: 'Label', icon: Type, category: 'typography' },
  { type: 'progress', name: 'Progress', icon: SliderIcon, category: 'feedback' },
  { type: 'select', name: 'Select', icon: Menu, category: 'input' },
  { type: 'separator', name: 'Separator', icon: SeparatorIcon, category: 'layout' },
  { type: 'slider', name: 'Slider', icon: SliderIcon, category: 'input' },
  { type: 'switch', name: 'Switch', icon: ToggleLeft, category: 'input' },
  { type: 'table', name: 'Table', icon: TableIcon, category: 'display' },
  { type: 'tabs', name: 'Tabs', icon: Layout, category: 'layout' },
  { type: 'textarea', name: 'Textarea', icon: Type, category: 'input' },
  { type: 'typography', name: 'Typography', icon: Type, category: 'typography' }
];

export const ShadcnVisualBuilder = ({ onSave }: { onSave?: (elements: ComponentElement[]) => void }) => {
  const { toast } = useToast();
  const [elements, setElements] = useState<ComponentElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<ComponentElement | null>(null);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('components');

  const addComponent = useCallback((type: string, name: string) => {
    const newElement: ComponentElement = {
      id: Date.now().toString(),
      type,
      name,
      props: getDefaultProps(type),
      styles: getDefaultStyles(type),
      position: { x: 100, y: 100 },
      size: { width: 200, height: 50 }
    };

    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
    
    toast({
      title: "Component Added",
      description: `${name} component has been added to your design.`,
    });
  }, [toast]);

  const deleteElement = useCallback((id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
    
    toast({
      title: "Component Deleted",
      description: "The component has been removed from your design.",
    });
  }, [toast]);

  const updateElement = useCallback((id: string, updates: Partial<ComponentElement>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
    
    if (selectedElement?.id === id) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedElement]);

  const renderComponent = (element: ComponentElement) => {
    const isSelected = selectedElement?.id === element.id;
    
    const wrapperStyle = {
      position: 'absolute' as const,
      left: element.position.x,
      top: element.position.y,
      width: element.size.width,
      height: element.size.height,
      border: isSelected ? '2px solid #3b82f6' : '1px solid transparent',
      cursor: 'pointer',
      ...element.styles
    };

    return (
      <div
        key={element.id}
        style={wrapperStyle}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(element);
        }}
        className="group relative hover:ring-2 hover:ring-blue-300 transition-all"
      >
        {renderElementContent(element)}
        
        {isSelected && (
          <div className="absolute -top-8 -right-2 flex space-x-1 z-50 bg-white rounded shadow-lg p-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                const duplicate = { ...element, id: Date.now().toString(), position: { x: element.position.x + 20, y: element.position.y + 20 } };
                setElements(prev => [...prev, duplicate]);
              }}
              className="h-6 w-6 p-0"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                deleteElement(element.id);
              }}
              className="h-6 w-6 p-0 text-red-600"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderElementContent = (element: ComponentElement) => {
    switch (element.type) {
      case 'button':
        return <Button variant={element.props.variant || 'default'}>{element.props.text || 'Button'}</Button>;
      
      case 'card':
        return (
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>{element.props.title || 'Card Title'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{element.props.content || 'Card content goes here.'}</p>
            </CardContent>
          </Card>
        );
      
      case 'badge':
        return <Badge variant={element.props.variant || 'default'}>{element.props.text || 'Badge'}</Badge>;
      
      case 'alert':
        return (
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertTitle>{element.props.title || 'Alert Title'}</AlertTitle>
            <AlertDescription>{element.props.description || 'Alert description'}</AlertDescription>
          </Alert>
        );
      
      case 'input':
        return <Input placeholder={element.props.placeholder || 'Enter text...'} />;
      
      case 'textarea':
        return <Textarea placeholder={element.props.placeholder || 'Enter text...'} />;
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={`checkbox-${element.id}`} />
            <Label htmlFor={`checkbox-${element.id}`}>{element.props.label || 'Checkbox'}</Label>
          </div>
        );
      
      case 'switch':
        return (
          <div className="flex items-center space-x-2">
            <Switch id={`switch-${element.id}`} />
            <Label htmlFor={`switch-${element.id}`}>{element.props.label || 'Switch'}</Label>
          </div>
        );
      
      case 'progress':
        return <Progress value={element.props.value || 50} className="w-full" />;
      
      case 'separator':
        return <Separator />;
      
      case 'avatar':
        return (
          <Avatar>
            <AvatarImage src={element.props.src} />
            <AvatarFallback>{element.props.fallback || 'AB'}</AvatarFallback>
          </Avatar>
        );
      
      case 'accordion':
        return (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{element.props.title || 'Accordion Item'}</AccordionTrigger>
              <AccordionContent>{element.props.content || 'Accordion content'}</AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      
      case 'table':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Column 1</TableHead>
                <TableHead>Column 2</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Cell 1</TableCell>
                <TableCell>Cell 2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      
      case 'typography':
        return (
          <div className={`text-${element.props.size || 'base'} font-${element.props.weight || 'normal'}`}>
            {element.props.text || 'Typography element'}
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 text-gray-500">
            {element.name}
          </div>
        );
    }
  };

  const getDefaultProps = (type: string): Record<string, any> => {
    switch (type) {
      case 'button': return { text: 'Button', variant: 'default' };
      case 'card': return { title: 'Card Title', content: 'Card content' };
      case 'badge': return { text: 'Badge', variant: 'default' };
      case 'alert': return { title: 'Alert', description: 'Alert description' };
      case 'input': return { placeholder: 'Enter text...' };
      case 'textarea': return { placeholder: 'Enter text...' };
      case 'checkbox': return { label: 'Checkbox' };
      case 'switch': return { label: 'Switch' };
      case 'progress': return { value: 50 };
      case 'avatar': return { fallback: 'AB' };
      case 'accordion': return { title: 'Accordion Item', content: 'Accordion content' };
      case 'typography': return { text: 'Typography', size: 'base', weight: 'normal' };
      default: return {};
    }
  };

  const getDefaultStyles = (type: string): Record<string, any> => {
    return {
      backgroundColor: 'transparent',
      color: 'inherit',
      padding: '8px',
      borderRadius: '6px'
    };
  };

  const handleSave = () => {
    if (onSave) {
      onSave(elements);
    }
    
    toast({
      title: "Design Saved",
      description: "Your component design has been saved successfully.",
    });
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Shadcn Builder</h2>
          <p className="text-sm text-gray-600">Drag and drop shadcn components</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-2 m-4">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>
          
          <TabsContent value="components" className="p-4 space-y-4">
            <div className="space-y-4">
              {['layout', 'input', 'display', 'feedback', 'navigation', 'typography', 'overlay'].map(category => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-gray-700 mb-2 capitalize">{category}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {shadcnComponents
                      .filter(comp => comp.category === category)
                      .map((component) => {
                        const Icon = component.icon;
                        return (
                          <Button
                            key={component.type}
                            variant="outline"
                            onClick={() => addComponent(component.type, component.name)}
                            className="flex flex-col items-center p-3 h-auto hover:bg-blue-50"
                          >
                            <Icon className="w-4 h-4 mb-1" />
                            <span className="text-xs">{component.name}</span>
                          </Button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="properties" className="p-4">
            {selectedElement ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">Properties</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedElement(null)}
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="element-name">Component</Label>
                    <Input
                      id="element-name"
                      value={selectedElement.name}
                      onChange={(e) => updateElement(selectedElement.id, { name: e.target.value })}
                    />
                  </div>

                  {/* Component-specific properties */}
                  {selectedElement.type === 'button' && (
                    <>
                      <div>
                        <Label htmlFor="button-text">Text</Label>
                        <Input
                          id="button-text"
                          value={selectedElement.props.text || ''}
                          onChange={(e) => updateElement(selectedElement.id, {
                            props: { ...selectedElement.props, text: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="button-variant">Variant</Label>
                        <Select
                          value={selectedElement.props.variant || 'default'}
                          onValueChange={(value) => updateElement(selectedElement.id, {
                            props: { ...selectedElement.props, variant: value }
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="destructive">Destructive</SelectItem>
                            <SelectItem value="outline">Outline</SelectItem>
                            <SelectItem value="secondary">Secondary</SelectItem>
                            <SelectItem value="ghost">Ghost</SelectItem>
                            <SelectItem value="link">Link</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {selectedElement.type === 'card' && (
                    <>
                      <div>
                        <Label htmlFor="card-title">Title</Label>
                        <Input
                          id="card-title"
                          value={selectedElement.props.title || ''}
                          onChange={(e) => updateElement(selectedElement.id, {
                            props: { ...selectedElement.props, title: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="card-content">Content</Label>
                        <Textarea
                          id="card-content"
                          value={selectedElement.props.content || ''}
                          onChange={(e) => updateElement(selectedElement.id, {
                            props: { ...selectedElement.props, content: e.target.value }
                          })}
                        />
                      </div>
                    </>
                  )}

                  {/* Size controls */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        type="number"
                        value={selectedElement.size.width}
                        onChange={(e) => updateElement(selectedElement.id, {
                          size: { ...selectedElement.size, width: parseInt(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        type="number"
                        value={selectedElement.size.height}
                        onChange={(e) => updateElement(selectedElement.id, {
                          size: { ...selectedElement.size, height: parseInt(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-500">
                <div className="text-center">
                  <Settings className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Select a component to edit its properties</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
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
              <Button
                variant={viewport === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewport('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewport === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewport('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewport === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewport('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
                <span className="ml-1">Preview</span>
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4" />
                <span className="ml-1">Save</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-8 overflow-auto bg-gray-100">
          <div 
            className={`mx-auto bg-white shadow-lg min-h-96 relative ${
              viewport === 'desktop' ? 'max-w-full' :
              viewport === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
            }`}
            style={{ 
              transition: 'max-width 0.3s ease',
              minHeight: '600px',
              position: 'relative'
            }}
            onClick={() => setSelectedElement(null)}
          >
            {elements.map(renderComponent)}

            {elements.length === 0 && (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <Grid className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Start building by adding components from the sidebar</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
