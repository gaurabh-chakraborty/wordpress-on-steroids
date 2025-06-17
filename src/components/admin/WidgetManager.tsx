
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Move, Type, Image, List, Calendar } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { useToast } from '@/hooks/use-toast';

interface Widget {
  id: string;
  type: 'text' | 'image' | 'list' | 'calendar';
  title: string;
  content: string;
  position: 'sidebar' | 'footer' | 'header';
  isActive: boolean;
  order: number;
}

export const WidgetManager = () => {
  const { mockApiCall } = useAdmin();
  const { toast } = useToast();
  
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: '1',
      type: 'text',
      title: 'Welcome Message',
      content: 'Welcome to our website! We are glad you are here.',
      position: 'sidebar',
      isActive: true,
      order: 1
    },
    {
      id: '2',
      type: 'list',
      title: 'Recent Posts',
      content: 'Display latest blog posts',
      position: 'sidebar',
      isActive: true,
      order: 2
    },
    {
      id: '3',
      type: 'text',
      title: 'Contact Info',
      content: 'Phone: (555) 123-4567\nEmail: info@example.com',
      position: 'footer',
      isActive: true,
      order: 1
    }
  ]);

  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const [showForm, setShowForm] = useState(false);

  const widgetTypes = [
    { type: 'text', label: 'Text Widget', icon: Type },
    { type: 'image', label: 'Image Widget', icon: Image },
    { type: 'list', label: 'List Widget', icon: List },
    { type: 'calendar', label: 'Calendar Widget', icon: Calendar }
  ];

  const positions = [
    { value: 'header', label: 'Header' },
    { value: 'sidebar', label: 'Sidebar' },
    { value: 'footer', label: 'Footer' }
  ];

  const handleCreateWidget = () => {
    const newWidget: Widget = {
      id: Date.now().toString(),
      type: 'text',
      title: 'New Widget',
      content: 'Widget content goes here...',
      position: 'sidebar',
      isActive: true,
      order: widgets.length + 1
    };
    setEditingWidget(newWidget);
    setShowForm(true);
  };

  const handleSaveWidget = (widget: Widget) => {
    if (widget.id && widgets.find(w => w.id === widget.id)) {
      setWidgets(prev => prev.map(w => w.id === widget.id ? widget : w));
      toast({ title: "Widget updated successfully!" });
    } else {
      setWidgets(prev => [...prev, widget]);
      toast({ title: "Widget created successfully!" });
    }
    mockApiCall('/api/widgets', widget);
    setShowForm(false);
    setEditingWidget(null);
  };

  const handleDeleteWidget = (id: string) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
    toast({ title: "Widget deleted successfully!" });
    mockApiCall(`/api/widgets/${id}`, { method: 'DELETE' });
  };

  const toggleWidget = (id: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === id ? { ...w, isActive: !w.isActive } : w
    ));
    toast({ title: "Widget status updated!" });
  };

  const WidgetForm = ({ widget, onSave, onCancel }: { 
    widget: Widget; 
    onSave: (widget: Widget) => void; 
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState(widget);

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{widget.id ? 'Edit Widget' : 'Create Widget'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Widget Type</Label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full p-2 border rounded-md"
              >
                {widgetTypes.map(type => (
                  <option key={type.type} value={type.type}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Position</Label>
              <select
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value as any }))}
                className="w-full p-2 border rounded-md"
              >
                {positions.map(pos => (
                  <option key={pos.value} value={pos.value}>{pos.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Widget title"
            />
          </div>
          
          <div>
            <Label>Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Widget content"
              rows={4}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
            <Label>Active</Label>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={() => onSave(formData)}>Save Widget</Button>
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Widget Manager</h1>
          <p className="text-gray-600">Manage sidebar, header, and footer widgets</p>
        </div>
        <Button onClick={handleCreateWidget}>
          <Plus className="w-4 h-4 mr-2" />
          Add Widget
        </Button>
      </div>

      {showForm && editingWidget && (
        <WidgetForm
          widget={editingWidget}
          onSave={handleSaveWidget}
          onCancel={() => { setShowForm(false); setEditingWidget(null); }}
        />
      )}

      <div className="grid gap-6">
        {['header', 'sidebar', 'footer'].map(position => (
          <Card key={position}>
            <CardHeader>
              <CardTitle className="capitalize">{position} Widgets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {widgets
                  .filter(w => w.position === position)
                  .sort((a, b) => a.order - b.order)
                  .map(widget => {
                    const WidgetIcon = widgetTypes.find(t => t.type === widget.type)?.icon || Type;
                    return (
                      <div key={widget.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <WidgetIcon className="w-5 h-5 text-gray-500" />
                          <div>
                            <h3 className="font-medium">{widget.title}</h3>
                            <p className="text-sm text-gray-600 truncate max-w-md">{widget.content}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={widget.isActive}
                            onCheckedChange={() => toggleWidget(widget.id)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { setEditingWidget(widget); setShowForm(true); }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteWidget(widget.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                {widgets.filter(w => w.position === position).length === 0 && (
                  <p className="text-gray-500 text-center py-8">No widgets in this position</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
