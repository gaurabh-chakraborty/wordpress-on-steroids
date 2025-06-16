
import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Edit, Trash2, Eye, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAdmin } from '@/context/AdminContext';
import { PostEditor } from './PostEditor';
import { Post } from '@/types/admin';

export const PostManager = () => {
  const { posts, deletePost, updatePost } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const filteredPosts = posts.filter(post => {
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter === 'all' ? true : post.status === statusFilter;
    return searchMatch && statusMatch;
  });

  const handleStatusChange = (postId: string, newStatus: 'published' | 'draft' | 'pending') => {
    updatePost(postId, { status: newStatus });
  };

  const handleDelete = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingPost(null);
    setIsEditing(true);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  if (isEditing) {
    return (
      <PostEditor 
        post={editingPost || undefined}
        onBack={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="container py-4 px-4 sm:py-10">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-4">
          <CardTitle className="text-xl sm:text-2xl">Posts</CardTitle>
          <Button onClick={handleAddNew} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Post
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-4">
              {filteredPosts.map(post => (
                <Card key={post.id} className="p-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-sm leading-tight flex-1 pr-2">{post.title}</h3>
                      <Badge variant={getStatusVariant(post.status)} className="text-xs">
                        {post.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>Author: {post.author}</p>
                      <p>Tags: {post.tags.join(', ')}</p>
                      <p>Categories: {post.categories.join(', ')}</p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map(post => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(post.status)}>
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{post.tags.join(', ')}</TableCell>
                      <TableCell>{post.categories.join(', ')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button size="icon" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
