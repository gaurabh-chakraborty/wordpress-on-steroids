
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOOptimizerPlugin } from '@/components/plugins/SEOOptimizerPlugin';
import { ContactFormPlugin } from '@/components/plugins/ContactFormPlugin';
import { SocialSharePlugin } from '@/components/plugins/SocialSharePlugin';
import { WooCommercePlugin } from '@/components/plugins/WooCommercePlugin';
import { Plugin } from '@/types/admin';

interface PluginSettingsProps {
  plugin: Plugin;
  onBack: () => void;
}

export const PluginSettings = ({ plugin, onBack }: PluginSettingsProps) => {
  const renderPluginSettings = () => {
    switch (plugin.id) {
      case '1':
        return <SEOOptimizerPlugin />;
      case '2':
        return <ContactFormPlugin />;
      case '3':
        return <SocialSharePlugin />;
      case '6':
        return <WooCommercePlugin />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Settings Available</h3>
            <p className="text-gray-600">This plugin doesn't have any configurable settings.</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plugins
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{plugin.name} Settings</h1>
          <p className="text-gray-600">Configure {plugin.name} plugin settings</p>
        </div>
      </div>

      {renderPluginSettings()}
    </div>
  );
};
