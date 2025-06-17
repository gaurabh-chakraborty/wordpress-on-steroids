
import React, { useState } from 'react';
import { 
  Palette, 
  Download, 
  Eye, 
  Settings, 
  Check,
  Star,
  Monitor,
  Smartphone,
  Tablet,
  Upload,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/context/AdminContext';
import { Theme } from '@/types/admin';
import { ThemeCustomizer } from './ThemeCustomizer';
import { useToast } from '@/hooks/use-toast';

export const ThemeManager = () => {
  const { themes, activeTheme, activateTheme, installTheme, uninstallTheme } = useAdmin();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'installed' | 'available'>('installed');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const availableThemes: Theme[] = [
    {
      id: '4',
      name: 'Corporate Pro',
      description: 'Professional business theme with clean design and advanced features',
      version: '2.1.0',
      author: 'Business Themes',
      isActive: false,
      isInstalled: false,
      screenshot: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
      tags: ['business', 'corporate', 'professional'],
      features: ['Responsive Design', 'SEO Optimized', 'Custom Colors', 'Multiple Layouts'],
      customization: {
        colors: { primary: '#2563eb', secondary: '#64748b', accent: '#f59e0b' },
        typography: { headingFont: 'Inter', bodyFont: 'Inter' },
        layout: { containerWidth: '1200px', headerStyle: 'classic' }
      },
      demoContent: {
        pages: [
          { title: 'Corporate Home', content: 'Welcome to our professional business website.', slug: 'corporate-home', template: 'landing' },
          { title: 'Our Services', content: 'Discover our comprehensive business solutions.', slug: 'our-services', template: 'default' }
        ],
        posts: [
          { title: 'Industry Insights', content: 'Latest trends in the business world.', excerpt: 'Stay ahead with our industry analysis.' },
          { title: 'Company News', content: 'Recent updates from our organization.', excerpt: 'Latest company announcements.' }
        ],
        media: []
      }
    },
    {
      id: '5',
      name: 'Creative Studio',
      description: 'Modern creative theme perfect for portfolios and agencies',
      version: '1.8.2',
      author: 'Creative Co',
      isActive: false,
      isInstalled: false,
      screenshot: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      tags: ['creative', 'portfolio', 'modern'],
      features: ['Portfolio Grid', 'Parallax Effects', 'Animation Ready', 'Gallery Support'],
      customization: {
        colors: { primary: '#8b5cf6', secondary: '#06b6d4', accent: '#f97316' },
        typography: { headingFont: 'Playfair Display', bodyFont: 'Source Sans Pro' },
        layout: { containerWidth: '1400px', headerStyle: 'minimal' }
      },
      demoContent: {
        pages: [
          { title: 'Creative Portfolio', content: 'Showcasing our creative work and projects.', slug: 'portfolio', template: 'full-width' },
          { title: 'About Studio', content: 'Learn about our creative process and team.', slug: 'about-studio', template: 'default' }
        ],
        posts: [
          { title: 'Design Trends 2024', content: 'Exploring the latest in creative design.', excerpt: 'What\'s trending in design this year.' },
          { title: 'Project Showcase', content: 'Behind the scenes of our latest project.', excerpt: 'Creative process revealed.' }
        ],
        media: []
      }
    }
  ];

  const displayThemes = activeTab === 'installed' 
    ? themes.filter(t => t.isInstalled)
    : availableThemes;

  const filteredThemes = displayThemes.filter(theme =>
    theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInstall = (theme: Theme) => {
    installTheme(theme);
    toast({
      title: "Theme Installed",
      description: `${theme.name} has been successfully installed.`,
    });
  };

  const handleActivate = (theme: Theme) => {
    activateTheme(theme.id);
    toast({
      title: "Theme Activated",
      description: `${theme.name} is now your active theme.`,
    });
  };

  const handleCustomize = (theme: Theme) => {
    setSelectedTheme(theme);
    setShowCustomizer(true);
  };

  const handleImportDemo = (theme: Theme) => {
    if (theme.demoContent) {
      toast({
        title: "Demo Content Imported",
        description: `Sample content from ${theme.name} has been imported.`,
      });
    }
  };

  const handleUninstall = (theme: Theme) => {
    if (theme.isActive) {
      toast({
        title: "Cannot Uninstall",
        description: "You cannot uninstall the currently active theme.",
        variant: "destructive"
      });
      return;
    }
    
    uninstallTheme(theme.id);
    toast({
      title: "Theme Uninstalled",
      description: `${theme.name} has been uninstalled.`,
    });
  };

  if (showCustomizer && selectedTheme) {
    return (
      <ThemeCustomizer 
        theme={selectedTheme}
        onBack={() => setShowCustomizer(false)}
      />
    );
  }

  const getDevicePreviewClass = () => {
    switch (previewDevice) {
      case 'tablet': return 'max-w-2xl mx-auto';
      case 'mobile': return 'max-w-sm mx-auto';
      default: return 'w-full';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Themes</h1>
          <p className="text-gray-600 mt-1">Customize the appearance of your website with themes.</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Upload Theme</span>
        </Button>
      </div>

      {/* Current Theme Preview */}
      {activeTheme && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Current Theme: {activeTheme.name}</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewDevice('desktop')}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewDevice('tablet')}
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewDevice('mobile')}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`border rounded-lg overflow-hidden ${getDevicePreviewClass()}`}>
              <img 
                src={activeTheme.screenshot} 
                alt={activeTheme.name}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => handleCustomize(activeTheme)}>
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Live Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              <Button
                variant={activeTab === 'installed' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('installed')}
                className="px-4 py-2"
              >
                Installed ({themes.filter(t => t.isInstalled).length})
              </Button>
              <Button
                variant={activeTab === 'available' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('available')}
                className="px-4 py-2"
              >
                Available ({availableThemes.length})
              </Button>
            </div>
            <div className="relative">
              <Input
                placeholder="Search themes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map((theme) => (
          <Card key={theme.id} className="hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
              <img 
                src={theme.screenshot} 
                alt={theme.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {theme.isActive && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-green-500">
                    <Check className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              )}
              <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>4.9</span>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{theme.name}</CardTitle>
                  <p className="text-sm text-gray-600">v{theme.version} by {theme.author}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 mb-4 text-sm">{theme.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {theme.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Features:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {theme.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col space-y-2">
                {theme.isInstalled ? (
                  <div className="flex space-x-2">
                    {!theme.isActive ? (
                      <Button 
                        onClick={() => handleActivate(theme)}
                        className="flex-1"
                      >
                        Activate
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleCustomize(theme)}
                        className="flex-1"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Customize
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUninstall(theme)}
                      disabled={theme.isActive}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleInstall(theme)}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Install
                  </Button>
                )}
                
                {theme.isInstalled && theme.demoContent && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleImportDemo(theme)}
                    className="w-full"
                  >
                    Import Demo Content
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredThemes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Palette className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No themes found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search criteria.'
                : `No ${activeTab} themes available.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
