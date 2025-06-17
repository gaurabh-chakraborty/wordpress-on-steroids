
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Share2, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SocialSharePlugin = () => {
  const { toast } = useToast();
  const [shareSettings, setShareSettings] = useState({
    platforms: ['facebook', 'twitter', 'linkedin'],
    showCounts: true,
    position: 'bottom',
    style: 'buttons',
    showLabels: true
  });

  const [analytics] = useState({
    totalShares: 1247,
    topPlatform: 'facebook',
    recentShares: [
      { platform: 'facebook', count: 45, title: 'Welcome to Your New Admin Panel' },
      { platform: 'twitter', count: 32, title: 'Getting Started with Content Creation' },
      { platform: 'linkedin', count: 28, title: 'Advanced Features and Customization' }
    ]
  });

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-sky-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-red-600' }
  ];

  const togglePlatform = (platformId: string) => {
    setShareSettings(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Social sharing settings have been updated successfully",
    });
  };

  const previewShare = () => {
    toast({
      title: "Share Preview",
      description: "Opening share preview in new window...",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{analytics.totalShares}</div>
              <div className="text-sm text-gray-600">Total Shares</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">24%</div>
              <div className="text-sm text-gray-600">Increase This Month</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 capitalize">{analytics.topPlatform}</div>
              <div className="text-sm text-gray-600">Top Platform</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Recent Popular Shares</h4>
            {analytics.recentShares.map((share, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {React.createElement(platforms.find(p => p.id === share.platform)?.icon || Share2, {
                    className: `w-5 h-5 text-white p-1 rounded ${platforms.find(p => p.id === share.platform)?.color}`
                  })}
                  <span className="font-medium">{share.title}</span>
                </div>
                <Badge>{share.count} shares</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Platforms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {platforms.map((platform) => {
              const IconComponent = platform.icon;
              const isEnabled = shareSettings.platforms.includes(platform.id);
              
              return (
                <div key={platform.id} className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  isEnabled ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`} onClick={() => togglePlatform(platform.id)}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${platform.color}`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{platform.name}</div>
                      <div className="text-sm text-gray-600">
                        {isEnabled ? 'Enabled' : 'Disabled'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Show Share Counts</label>
              <p className="text-sm text-gray-600">Display the number of shares for each platform</p>
            </div>
            <Switch 
              checked={shareSettings.showCounts}
              onCheckedChange={(checked) => setShareSettings(prev => ({...prev, showCounts: checked}))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Show Labels</label>
              <p className="text-sm text-gray-600">Display platform names next to icons</p>
            </div>
            <Switch 
              checked={shareSettings.showLabels}
              onCheckedChange={(checked) => setShareSettings(prev => ({...prev, showLabels: checked}))}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Button Position</label>
            <Select value={shareSettings.position} onValueChange={(value) => setShareSettings(prev => ({...prev, position: value}))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">Top of Content</SelectItem>
                <SelectItem value="bottom">Bottom of Content</SelectItem>
                <SelectItem value="both">Both Top & Bottom</SelectItem>
                <SelectItem value="floating">Floating Sidebar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block font-medium mb-2">Button Style</label>
            <Select value={shareSettings.style} onValueChange={(value) => setShareSettings(prev => ({...prev, style: value}))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buttons">Button Style</SelectItem>
                <SelectItem value="icons">Icons Only</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="rounded">Rounded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button onClick={saveSettings} className="flex-1">
              Save Settings
            </Button>
            <Button onClick={previewShare} variant="outline">
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
