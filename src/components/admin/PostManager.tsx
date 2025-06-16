
import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    <div className="container py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Posts</CardTitle>
          <div className="space-x-2">
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" /> Add Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
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
            <div className="overflow-x-auto">
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
