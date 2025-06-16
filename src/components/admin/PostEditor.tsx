
import React, { useState } from 'react';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdmin } from '@/context/AdminContext';
import { Post } from '@/types/admin';

interface PostEditorProps {
  post?: Post;
  onBack: () => void;
}

export const PostEditor = ({ post, onBack }: PostEditorProps) => {
  const { createPost, updatePost, currentUser } = useAdmin();
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [status, setStatus] = useState<'published' | 'draft' | 'pending'>(post?.status || 'draft');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [categories, setCategories] = useState(post?.categories?.join(', ') || '');

  const handleSave = () => {
    const postData = {
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      status,
      author: currentUser.username,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      categories: categories.split(',').map(cat => cat.trim()).filter(Boolean),
      featuredImage: post?.featuredImage
    };

    if (post) {
      updatePost(post.id, postData);
    } else {
      createPost(postData);
    }
    
    onBack();
  };

  return (
    <div className="container py-4 px-4 sm:py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold">
            {post ? 'Edit Post' : 'Create New Post'}
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
                placeholder="Post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg sm:text-xl font-semibold"
              />
              <textarea
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-48 sm:h-64 p-3 border border-gray-300 rounded-md resize-none text-sm sm:text-base"
              />
              <Input
                placeholder="Post excerpt (optional)..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
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
              <CardTitle>Categories & Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Categories</label>
                <Input
                  placeholder="Separate with commas"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <Input
                  placeholder="Separate with commas"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
