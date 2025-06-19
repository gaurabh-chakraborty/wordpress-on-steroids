
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, Calendar, Tag, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/context/AdminContext';
import { Post } from '@/types/admin';
import { PlateEditor } from '@/components/editor/PlateEditor';

interface PostEditorProps {
  post?: Post;
  onBack: () => void;
}

export const PostEditor = ({ post, onBack }: PostEditorProps) => {
  const { createPost, updatePost } = useAdmin();
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [status, setStatus] = useState<'published' | 'draft' | 'pending'>(post?.status || 'draft');
  const [tags, setTags] = useState(post?.tags.join(', ') || '');
  const [categories, setCategories] = useState(post?.categories.join(', ') || '');
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '');
  const [plateContent, setPlateContent] = useState([
    { type: 'p', children: [{ text: post?.content || '' }] }
  ]);

  const handleSave = () => {
    const postData = {
      title,
      content,
      excerpt,
      status: status as 'published' | 'draft' | 'pending',
      author: 'admin',
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      categories: categories.split(',').map(cat => cat.trim()).filter(Boolean),
      featuredImage
    };

    if (post) {
      updatePost(post.id, postData);
    } else {
      createPost(postData);
    }
    
    onBack();
  };

  const handleContentChange = (value: any[]) => {
    setPlateContent(value);
    // Convert plate content to text for storage
    const textContent = value
      .map(node => node.children?.map((child: any) => child.text).join('') || '')
      .join('\n');
    setContent(textContent);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as 'published' | 'draft' | 'pending');
  };

  return (
    <div className="container py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Posts
            </Button>
            <h1 className="text-2xl font-bold">
              {post ? 'Edit Post' : 'Create New Post'}
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title..."
                    className="text-lg font-medium"
                  />
                </div>

                <div>
                  <Label>Content</Label>
                  <PlateEditor
                    value={plateContent}
                    onChange={handleContentChange}
                    placeholder="Start writing your post..."
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description of the post..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Publish
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={handleStatusChange}>
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

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">
                    Status: <Badge variant="secondary">{status}</Badge>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Categories & Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Folder className="w-4 h-4 mr-2" />
                  Organization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="categories">Categories</Label>
                  <Input
                    id="categories"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                    placeholder="Technology, News, etc."
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                </div>

                <div>
                  <Label htmlFor="tags" className="flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="react, javascript, tutorial"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="Image URL"
                  />
                  {featuredImage && (
                    <div className="relative">
                      <img
                        src={featuredImage}
                        alt="Featured"
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
