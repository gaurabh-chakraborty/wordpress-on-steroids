
import React, { useState } from 'react';
import { ArrowLeft, Save, Eye, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/context/AdminContext';
import { Page } from '@/types/admin';
import { PlateEditor } from '@/components/editor/PlateEditor';
import { ShadcnVisualBuilder } from '@/components/editor/ShadcnVisualBuilder';

interface PageEditorProps {
  page?: Page;
  onBack: () => void;
}

export const PageEditor = ({ page, onBack }: PageEditorProps) => {
  const { createPage, updatePage } = useAdmin();
  const [title, setTitle] = useState(page?.title || '');
  const [content, setContent] = useState(page?.content || '');
  const [slug, setSlug] = useState(page?.slug || '');
  const [status, setStatus] = useState<'published' | 'draft' | 'pending'>(page?.status || 'draft');
  const [template, setTemplate] = useState(page?.template || 'default');
  const [editorMode, setEditorMode] = useState<'text' | 'visual' | 'builder'>('text');
  const [plateContent, setPlateContent] = useState([
    { type: 'p', children: [{ text: page?.content || '' }] }
  ]);

  const handleSave = () => {
    const pageData = {
      title,
      content,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      status,
      template
    };

    if (page) {
      updatePage(page.id, pageData);
    } else {
      createPage(pageData);
    }
    
    onBack();
  };

  const handleContentChange = (value: any[]) => {
    setPlateContent(value);
    const textContent = value
      .map(node => node.children?.map((child: any) => child.text).join('') || '')
      .join('\n');
    setContent(textContent);
  };

  const handleVisualBuilderSave = (elements: any[]) => {
    const visualContent = JSON.stringify(elements);
    setContent(visualContent);
  };

  return (
    <div className="container py-4 px-4 sm:py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pages
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold">
            {page ? 'Edit Page' : 'Create New Page'}
          </h1>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} className="flex-1 sm:flex-none">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Page title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg sm:text-xl font-semibold"
              />
              <Input
                placeholder="Page slug (URL path)..."
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="text-sm"
              />
              
              <div>
                <Label>Content Editor</Label>
                <Tabs value={editorMode} onValueChange={(value: any) => setEditorMode(value)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="text">Text Editor</TabsTrigger>
                    <TabsTrigger value="visual">Rich Editor</TabsTrigger>
                    <TabsTrigger value="builder">
                      <Palette className="w-4 h-4 mr-1" />
                      Visual Builder
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text">
                    <textarea
                      placeholder="Write your page content here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full h-48 sm:h-64 p-3 border border-gray-300 rounded-md resize-none text-sm sm:text-base"
                    />
                  </TabsContent>
                  
                  <TabsContent value="visual">
                    <PlateEditor
                      value={plateContent}
                      onChange={handleContentChange}
                      placeholder="Start writing your page..."
                    />
                  </TabsContent>
                  
                  <TabsContent value="builder">
                    <div className="border rounded-lg overflow-hidden" style={{ height: '600px' }}>
                      <ShadcnVisualBuilder onSave={handleVisualBuilderSave} />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Page Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Template</label>
                <Select value={template} onValueChange={setTemplate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="full-width">Full Width</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="contact">Contact Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
