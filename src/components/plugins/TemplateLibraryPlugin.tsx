import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { templates } from './template-library/data';
import { Template } from './template-library/types';
import { TemplateFilters } from './template-library/TemplateFilters';
import { TemplateGrid } from './template-library/TemplateGrid';

export const TemplateLibraryPlugin = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesType = selectedType === 'all' || template.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleImportTemplate = (template: Template) => {
    // In a real implementation, this would integrate with the visual builder
    toast({
      title: "Template Imported",
      description: `${template.name} has been added to your canvas.`,
    });
  };

  const handlePreviewTemplate = (template: Template) => {
    toast({
      title: "Preview Mode",
      description: `Previewing ${template.name}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Template Library</h2>
          <p className="text-gray-600 mt-1">Professional templates and components for your website</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {filteredTemplates.length} Templates
        </Badge>
      </div>

      <TemplateFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onTypeChange={setSelectedType}
      />

      <TemplateGrid
        templates={filteredTemplates}
        onPreview={handlePreviewTemplate}
        onImport={handleImportTemplate}
      />
    </div>
  );
};
