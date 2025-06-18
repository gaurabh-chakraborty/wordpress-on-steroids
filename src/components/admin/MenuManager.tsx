import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Move, Link, ExternalLink, FileText } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  label: string;
  url: string;
  type: 'page' | 'custom' | 'external';
  isActive: boolean;
  order: number;
  parentId?: string;
  children?: MenuItem[];
}

interface Menu {
  id: string;
  name: string;
  location: 'primary' | 'footer' | 'mobile';
  items: MenuItem[];
  isActive: boolean;
}

export const MenuManager = () => {
  const { pages, mockApiCall } = useAdmin();
  const { toast } = useToast();
  
  const [menus, setMenus] = useState<Menu[]>([
    {
      id: '1',
      name: 'Primary Navigation',
      location: 'primary',
      isActive: true,
      items: [
        { id: '1', label: 'Home', url: '/', type: 'page', isActive: true, order: 1 },
        { id: '2', label: 'About', url: '/about', type: 'page', isActive: true, order: 2 },
        { id: '3', label: 'Services', url: '/services', type: 'page', isActive: true, order: 3 },
        { id: '4', label: 'Contact', url: '/contact', type: 'page', isActive: true, order: 4 }
      ]
    },
    {
      id: '2',
      name: 'Footer Menu',
      location: 'footer',
      isActive: true,
      items: [
        { id: '5', label: 'Privacy Policy', url: '/privacy', type: 'page', isActive: true, order: 1 },
        { id: '6', label: 'Terms of Service', url: '/terms', type: 'page', isActive: true, order: 2 }
      ]
    }
  ]);

  const [activeMenu, setActiveMenu] = useState<Menu>(menus[0]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showItemForm, setShowItemForm] = useState(false);

  const menuLocations = [
    { value: 'primary', label: 'Primary Navigation' },
    { value: 'footer', label: 'Footer Menu' },
    { value: 'mobile', label: 'Mobile Menu' }
  ];

  const linkTypes = [
    { value: 'page', label: 'Page', icon: FileText, type: 'page' },
    { value: 'custom', label: 'Custom Link', icon: Link, type: 'custom' },
    { value: 'external', label: 'External Link', icon: ExternalLink, type: 'external' }
  ];

  const handleCreateMenu = () => {
    const newMenu: Menu = {
      id: Date.now().toString(),
      name: 'New Menu',
      location: 'primary',
      isActive: true,
      items: []
    };
    setMenus(prev => [...prev, newMenu]);
    setActiveMenu(newMenu);
    toast({ title: "Menu created successfully!" });
  };

  const handleUpdateMenu = (menuId: string, updates: Partial<Menu>) => {
    setMenus(prev => prev.map(menu => 
      menu.id === menuId ? { ...menu, ...updates } : menu
    ));
    if (activeMenu.id === menuId) {
      setActiveMenu(prev => ({ ...prev, ...updates }));
    }
    mockApiCall(`/api/menus/${menuId}`, updates);
  };

  const handleDeleteMenu = (menuId: string) => {
    setMenus(prev => prev.filter(menu => menu.id !== menuId));
    if (activeMenu.id === menuId && menus.length > 1) {
      setActiveMenu(menus.find(menu => menu.id !== menuId) || menus[0]);
    }
    toast({ title: "Menu deleted successfully!" });
  };

  const handleCreateMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      label: 'New Menu Item',
      url: '/',
      type: 'page',
      isActive: true,
      order: activeMenu.items.length + 1
    };
    setEditingItem(newItem);
    setShowItemForm(true);
  };

  const handleSaveMenuItem = (item: MenuItem) => {
    const updatedMenu = { ...activeMenu };
    
    if (item.id && updatedMenu.items.find(i => i.id === item.id)) {
      updatedMenu.items = updatedMenu.items.map(i => i.id === item.id ? item : i);
    } else {
      updatedMenu.items = [...updatedMenu.items, item];
    }
    
    setActiveMenu(updatedMenu);
    handleUpdateMenu(activeMenu.id, { items: updatedMenu.items });
    setShowItemForm(false);
    setEditingItem(null);
    toast({ title: "Menu item saved successfully!" });
  };

  const handleDeleteMenuItem = (itemId: string) => {
    const updatedItems = activeMenu.items.filter(item => item.id !== itemId);
    setActiveMenu(prev => ({ ...prev, items: updatedItems }));
    handleUpdateMenu(activeMenu.id, { items: updatedItems });
    toast({ title: "Menu item deleted successfully!" });
  };

  const MenuItemForm = ({ item, onSave, onCancel }: {
    item: MenuItem;
    onSave: (item: MenuItem) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState(item);

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{item.id ? 'Edit Menu Item' : 'Add Menu Item'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Link Type</Label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full p-2 border rounded-md"
              >
                {linkTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Label</Label>
              <Input
                value={formData.label}
                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                placeholder="Menu item label"
              />
            </div>
          </div>
          
          <div>
            <Label>URL</Label>
            {formData.type === 'page' ? (
              <select
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="/">Home</option>
                {pages.map(page => (
                  <option key={page.id} value={`/page/${page.slug}`}>
                    {page.title}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                placeholder={formData.type === 'external' ? 'https://example.com' : '/custom-path'}
              />
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
            <Label>Active</Label>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={() => onSave(formData)}>Save Item</Button>
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
          <h1 className="text-3xl font-bold">Menu Manager</h1>
          <p className="text-gray-600">Create and manage navigation menus</p>
        </div>
        <Button onClick={handleCreateMenu}>
          <Plus className="w-4 h-4 mr-2" />
          Create Menu
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Menus</h2>
          {menus.map(menu => (
            <Card 
              key={menu.id} 
              className={`cursor-pointer transition-colors ${
                activeMenu.id === menu.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setActiveMenu(menu)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{menu.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{menu.location}</p>
                    <p className="text-xs text-gray-500">{menu.items.length} items</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={menu.isActive}
                      onCheckedChange={(checked) => handleUpdateMenu(menu.id, { isActive: checked })}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMenu(menu.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Menu Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Edit Menu: {activeMenu.name}</CardTitle>
                  <p className="text-sm text-gray-600">Manage menu items and settings</p>
                </div>
                <Button onClick={handleCreateMenuItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Menu Settings */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Menu Name</Label>
                    <Input
                      value={activeMenu.name}
                      onChange={(e) => handleUpdateMenu(activeMenu.id, { name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <select
                      value={activeMenu.location}
                      onChange={(e) => handleUpdateMenu(activeMenu.id, { location: e.target.value as any })}
                      className="w-full p-2 border rounded-md"
                    >
                      {menuLocations.map(location => (
                        <option key={location.value} value={location.value}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {showItemForm && editingItem && (
                <MenuItemForm
                  item={editingItem}
                  onSave={handleSaveMenuItem}
                  onCancel={() => { setShowItemForm(false); setEditingItem(null); }}
                />
              )}

              {/* Menu Items */}
              <div className="space-y-2">
                {activeMenu.items
                  .sort((a, b) => a.order - b.order)
                  .map(item => {
                    const LinkIcon = linkTypes.find(t => t.type === item.type)?.icon || Link;
                    return (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Move className="w-4 h-4 text-gray-400 cursor-move" />
                          <LinkIcon className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="font-medium">{item.label}</span>
                            <p className="text-sm text-gray-600">{item.url}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={item.isActive}
                            onCheckedChange={(checked) => {
                              const updatedItems = activeMenu.items.map(i =>
                                i.id === item.id ? { ...i, isActive: checked } : i
                              );
                              handleUpdateMenu(activeMenu.id, { items: updatedItems });
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { setEditingItem(item); setShowItemForm(true); }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteMenuItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                {activeMenu.items.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No menu items yet. Add your first item!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
