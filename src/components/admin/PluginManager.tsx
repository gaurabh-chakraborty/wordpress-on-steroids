
import React, { useState } from 'react';
import { 
  Puzzle, 
  Search, 
  Download, 
  Settings, 
  ToggleLeft, 
  ToggleRight,
  Star,
  Shield,
  Zap,
  Mail,
  Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/context/AdminContext';
import { Plugin } from '@/types/admin';

const iconMap: Record<string, any> = {
  Search: Search,
  Mail: Mail,
  Share2: Share2,
  Shield: Shield,
  Zap: Zap
};

export const PluginManager = () => {
  const { plugins, togglePlugin, installPlugin } = useAdmin();
  const [activeTab, setActiveTab] = useState<'installed' | 'available'>('installed');
  const [searchTerm, setSearchTerm] = useState('');

  const availablePlugins: Plugin[] = [
    {
      id: '4',
      name: 'Security Guard',
      description: 'Advanced security features and malware protection',
      version: '3.2.1',
      author: 'Security Pro',
      isActive: false,
      isInstalled: false,
      icon: 'Shield'
    },
    {
      id: '5',
      name: 'Performance Booster',
      description: 'Optimize your site speed and performance',
      version: '2.8.0',
      author: 'Speed Team',
      isActive: false,
      isInstalled: false,
      icon: 'Zap'
    }
  ];

  const displayPlugins = activeTab === 'installed' 
    ? plugins.filter(p => p.isInstalled)
    : availablePlugins;

  const filteredPlugins = displayPlugins.filter(plugin =>
    plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plugin.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInstall = (plugin: Plugin) => {
    installPlugin(plugin);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plugins</h1>
          <p className="text-gray-600 mt-1">Extend your site's functionality with plugins.</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Upload Plugin</span>
        </Button>
      </div>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              <Button
                variant={activeTab === 'installed' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('installed')}
                className="px-4 py-2"
              >
                Installed ({plugins.filter(p => p.isInstalled).length})
              </Button>
              <Button
                variant={activeTab === 'available' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('available')}
                className="px-4 py-2"
              >
                Available ({availablePlugins.length})
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search plugins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => {
          const IconComponent = iconMap[plugin.icon] || Puzzle;
          return (
            <Card key={plugin.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{plugin.name}</CardTitle>
                      <p className="text-sm text-gray-600">v{plugin.version}</p>
                    </div>
                  </div>
                  {plugin.isInstalled && (
                    <Badge variant={plugin.isActive ? 'default' : 'secondary'}>
                      {plugin.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{plugin.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>By {plugin.author}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {plugin.isInstalled ? (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePlugin(plugin.id)}
                        className="flex items-center space-x-2"
                      >
                        {plugin.isActive ? (
                          <>
                            <ToggleRight className="w-4 h-4" />
                            <span>Deactivate</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-4 h-4" />
                            <span>Activate</span>
                          </>
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => handleInstall(plugin)}
                      className="flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Install</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPlugins.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Puzzle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No plugins found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search criteria.'
                : `No ${activeTab} plugins available.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
