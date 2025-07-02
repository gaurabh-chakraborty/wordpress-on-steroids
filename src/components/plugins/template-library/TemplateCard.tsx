import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Star } from 'lucide-react';
import { Template } from './types';

interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
  onImport: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onPreview,
  onImport
}) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={template.preview}
          alt={template.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {template.isPro && (
          <Badge className="absolute top-2 right-2 bg-yellow-500">
            <Star className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onPreview(template)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={() => onImport(template)}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{template.name}</h3>
          <Badge variant="outline" className="text-xs">
            {template.type}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 capitalize">
            {template.category}
          </span>
          <Button
            size="sm"
            onClick={() => onImport(template)}
            className="ml-auto"
          >
            Import
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};