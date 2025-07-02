import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from 'lucide-react';
import { Template } from './types';
import { TemplateCard } from './TemplateCard';

interface TemplateGridProps {
  templates: Template[];
  onPreview: (template: Template) => void;
  onImport: (template: Template) => void;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  onPreview,
  onImport
}) => {
  if (templates.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or browse different categories.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onPreview={onPreview}
          onImport={onImport}
        />
      ))}
    </div>
  );
};