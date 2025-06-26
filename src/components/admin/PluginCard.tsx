
import React from 'react';
import { 
  Puzzle, 
  Download, 
  Settings, 
  ToggleLeft, 
  ToggleRight,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plugin } from '@/types/admin';

const iconMap: Record<string, any> = {
  Search: require('lucide-react').Search,
  Mail: require('lucide-react').Mail,
  Share2: require('lucide-react').Share2,
  Shield: require('lucide-react').Shield,
  Zap: require('lucide-react').Zap,
  ShoppingCart: require('lucide-react').ShoppingCart,
  Layout: require('lucide-react').Layout,
  Play: require('lucide-react').Play,
  MessageCircle: require('lucide-react').MessageCircle,
  User: require('lucide-react').User
};

interface PluginCardProps {
  plugin: Plugin;
  onToggle: (id: string) => void;
  onInstall: (plugin: Plugin) => void;
  onSettings: (plugin: Plugin) => void;
}

export const PluginCard = ({ plugin, onToggle, onInstall, onSettings }: PluginCardProps) => {
  const IconComponent = iconMap[plugin.icon] || Puzzle;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
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
                onClick={() => onToggle(plugin.id)}
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
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onSettings(plugin)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => onInstall(plugin)}
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
};
