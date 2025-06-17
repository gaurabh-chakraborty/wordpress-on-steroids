
import React, { useState } from 'react';
import { ArrowLeft, Palette, Type, Layout, Save, RotateCcw, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin } from '@/context/AdminContext';
import { Theme, ThemeCustomization } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

interface ThemeCustomizerProps {
  theme: Theme;
  onBack: () => void;
}

export const ThemeCustomizer = ({ theme, onBack }: ThemeCustomizerProps) => {
  const { updateThemeCustomization } = useAdmin();
  const { toast } = useToast();
  const [customization, setCustomization] = useState<ThemeCustomization>({
    themeId: theme.id,
    colors: { ...theme.customization.colors },
    typography: { ...theme.customization.typography },
    layout: { ...theme.customization.layout }
  });

  const handleColorChange = (colorType: keyof ThemeCustomization['colors'], value: string) => {
    setCustomization(prev => ({
      ...prev,
      colors: { ...prev.colors, [colorType]: value }
    }));
  };

  const handleTypographyChange = (typographyType: keyof ThemeCustomization['typography'], value: string) => {
    setCustomization(prev => ({
      ...prev,
      typography: { ...prev.typography, [typographyType]: value }
    }));
  };

  const handleLayoutChange = (layoutType: keyof ThemeCustomization['layout'], value: string) => {
    setCustomization(prev => ({
      ...prev,
      layout: { ...prev.layout, [layoutType]: value }
    }));
  };

  const handleSave = () => {
    updateThemeCustomization(customization);
    toast({
      title: "Theme Customized",
      description: "Your theme customizations have been saved successfully.",
    });
  };

  const handleReset = () => {
    setCustomization({
      themeId: theme.id,
      colors: { ...theme.customization.colors },
      typography: { ...theme.customization.typography },
      layout: { ...theme.customization.layout }
    });
    toast({
      title: "Settings Reset",
      description: "Theme customization has been reset to defaults.",
    });
  };

  const fontOptions = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Source Sans Pro', 
    'Raleway', 'Ubuntu', 'Nunito', 'Playfair Display', 'Merriweather', 'Georgia'
  ];

  const containerWidthOptions = [
    { value: '1140px', label: 'Standard (1140px)' },
    { value: '1200px', label: 'Wide (1200px)' },
    { value: '1400px', label: 'Extra Wide (1400px)' },
    { value: '100%', label: 'Full Width' }
  ];

  const headerStyleOptions = [
    { value: 'classic', label: 'Classic' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'modern', label: 'Modern' },
    { value: 'bold', label: 'Bold' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Themes
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customize {theme.name}</h1>
            <p className="text-gray-600">Personalize your theme settings</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customization Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>

            <TabsContent value="colors">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>Color Scheme</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="primary-color"
                        type="color"
                        value={customization.colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={customization.colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        placeholder="#2563eb"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={customization.colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={customization.colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        placeholder="#64748b"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="accent-color"
                        type="color"
                        value={customization.colors.accent}
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={customization.colors.accent}
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                        placeholder="#f59e0b"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-3">Quick Color Schemes:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: 'Blue', primary: '#2563eb', secondary: '#64748b', accent: '#f59e0b' },
                        { name: 'Purple', primary: '#8b5cf6', secondary: '#6b7280', accent: '#10b981' },
                        { name: 'Green', primary: '#059669', secondary: '#6b7280', accent: '#f59e0b' }
                      ].map((scheme) => (
                        <button
                          key={scheme.name}
                          onClick={() => setCustomization(prev => ({
                            ...prev,
                            colors: { primary: scheme.primary, secondary: scheme.secondary, accent: scheme.accent }
                          }))}
                          className="p-2 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex space-x-1 mb-1">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: scheme.primary }}></div>
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: scheme.secondary }}></div>
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: scheme.accent }}></div>
                          </div>
                          <p className="text-xs">{scheme.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Type className="w-5 h-5" />
                    <span>Typography</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="heading-font">Heading Font</Label>
                    <Select value={customization.typography.headingFont} onValueChange={(value) => handleTypographyChange('headingFont', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select heading font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font} value={font}>{font}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="body-font">Body Font</Label>
                    <Select value={customization.typography.bodyFont} onValueChange={(value) => handleTypographyChange('bodyFont', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select body font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font} value={font}>{font}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-3">Font Preview:</p>
                    <div className="space-y-2 p-3 bg-gray-50 rounded">
                      <h3 style={{ fontFamily: customization.typography.headingFont }} className="text-lg font-bold">
                        Sample Heading
                      </h3>
                      <p style={{ fontFamily: customization.typography.bodyFont }} className="text-sm">
                        This is how your body text will appear with the selected typography settings.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layout className="w-5 h-5" />
                    <span>Layout Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="container-width">Container Width</Label>
                    <Select value={customization.layout.containerWidth} onValueChange={(value) => handleLayoutChange('containerWidth', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select container width" />
                      </SelectTrigger>
                      <SelectContent>
                        {containerWidthOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="header-style">Header Style</Label>
                    <Select value={customization.layout.headerStyle} onValueChange={(value) => handleLayoutChange('headerStyle', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select header style" />
                      </SelectTrigger>
                      <SelectContent>
                        {headerStyleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div 
                  className="p-6"
                  style={{
                    backgroundColor: '#ffffff',
                    fontFamily: customization.typography.bodyFont,
                    maxWidth: customization.layout.containerWidth,
                    margin: '0 auto'
                  }}
                >
                  {/* Header Preview */}
                  <header 
                    className={`p-4 mb-6 rounded ${
                      customization.layout.headerStyle === 'minimal' ? 'border-b' :
                      customization.layout.headerStyle === 'bold' ? 'text-white' :
                      'shadow-sm'
                    }`}
                    style={{
                      backgroundColor: customization.layout.headerStyle === 'bold' ? customization.colors.primary : '#ffffff',
                      borderColor: customization.colors.secondary
                    }}
                  >
                    <nav className="flex justify-between items-center">
                      <h1 
                        style={{ 
                          color: customization.layout.headerStyle === 'bold' ? '#ffffff' : customization.colors.primary,
                          fontFamily: customization.typography.headingFont 
                        }}
                        className="text-xl font-bold"
                      >
                        {theme.name}
                      </h1>
                      <div className="flex space-x-4">
                        {['Home', 'About', 'Services', 'Contact'].map((item) => (
                          <a 
                            key={item}
                            href="#"
                            style={{ 
                              color: customization.layout.headerStyle === 'bold' ? '#ffffff' : customization.colors.secondary
                            }}
                            className="hover:opacity-75"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </header>

                  {/* Content Preview */}
                  <main>
                    <h2 
                      style={{ 
                        color: customization.colors.primary,
                        fontFamily: customization.typography.headingFont 
                      }}
                      className="text-3xl font-bold mb-4"
                    >
                      Welcome to Your Website
                    </h2>
                    <p style={{ color: customization.colors.secondary }} className="mb-6">
                      This is a preview of how your content will appear with the current theme customization settings.
                    </p>
                    <button 
                      style={{ backgroundColor: customization.colors.accent }}
                      className="px-6 py-3 text-white rounded-lg hover:opacity-90"
                    >
                      Call to Action
                    </button>
                  </main>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
