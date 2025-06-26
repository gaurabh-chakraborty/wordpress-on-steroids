
import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plugin } from '@/types/admin';
import { WooCommercePlugin } from '@/components/plugins/WooCommercePlugin';
import { TemplateLibraryPlugin } from '@/components/plugins/TemplateLibraryPlugin';
import { SliderRevolutionPlugin } from '@/components/plugins/SliderRevolutionPlugin';
import { NewsletterPlugin } from '@/components/plugins/NewsletterPlugin';
import { ChatPlugin } from '@/components/plugins/ChatPlugin';
import { UserAccountPlugin } from '@/components/plugins/UserAccountPlugin';

interface PluginSettingsProps {
  plugin: Plugin;
  onBack: () => void;
}

export const PluginSettings = ({ plugin, onBack }: PluginSettingsProps) => {
  const renderPluginContent = () => {
    switch (plugin.name) {
      case 'WooCommerce':
        return <WooCommercePlugin />;
      case 'Template Library':
        return <TemplateLibraryPlugin />;
      case 'Slider Revolution':
        return <SliderRevolutionPlugin />;
      case 'Newsletter Manager':
        return <NewsletterPlugin />;
      case 'Live Chat':
        return <ChatPlugin />;
      case 'User Accounts':
        return <UserAccountPlugin />;
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>{plugin.name} Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Settings for {plugin.name} will be available here.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Plugins</span>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{plugin.name}</h1>
          <p className="text-gray-600 mt-1">{plugin.description}</p>
        </div>
      </div>

      {renderPluginContent()}
    </div>
  );
};
