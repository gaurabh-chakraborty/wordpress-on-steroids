
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/context/AdminContext';
import { Plugin } from '@/types/admin';
import { PluginSettings } from './PluginSettings';
import { PluginTabs } from './PluginTabs';
import { PluginGrid } from './PluginGrid';

export const PluginManager = () => {
  const { plugins, togglePlugin, installPlugin } = useAdmin();
  const [activeTab, setActiveTab] = useState<'installed' | 'available'>('installed');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);
  const [showSettings, setShowSettings] = useState(false);

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
    },
    {
      id: '6',
      name: 'WooCommerce',
      description: 'Complete e-commerce solution with products, orders, payments, and shipping',
      version: '8.2.1',
      author: 'WooCommerce Team',
      isActive: false,
      isInstalled: false,
      icon: 'ShoppingCart'
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

  const handleSettings = (plugin: Plugin) => {
    setSelectedPlugin(plugin);
    setShowSettings(true);
  };

  if (showSettings && selectedPlugin) {
    return (
      <PluginSettings 
        plugin={selectedPlugin}
        onBack={() => setShowSettings(false)}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
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

      <PluginTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        installedCount={plugins.filter(p => p.isInstalled).length}
        availableCount={availablePlugins.length}
      />

      <PluginGrid
        plugins={filteredPlugins}
        searchTerm={searchTerm}
        activeTab={activeTab}
        onToggle={togglePlugin}
        onInstall={handleInstall}
        onSettings={handleSettings}
      />
    </div>
  );
};
