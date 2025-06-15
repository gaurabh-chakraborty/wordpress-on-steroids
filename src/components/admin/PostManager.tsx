import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Post } from '@/types/admin';

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Exploring the Depths of React Hooks',
    content: 'A detailed guide on mastering React Hooks for efficient state management.',
    excerpt: 'Master React Hooks for efficient state management.',
    status: 'published',
    author: 'John Doe',
    createdAt: '2023-01-15',
    updatedAt: '2023-01-20',
    tags: ['react', 'hooks', 'javascript'],
    categories: ['web development'],
    featuredImage: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Tailwind CSS',
    content: 'Learn how to build beautiful and responsive websites with Tailwind CSS.',
    excerpt: 'Build beautiful and responsive websites with Tailwind CSS.',
    status: 'draft',
    author: 'Jane Smith',
    createdAt: '2023-02-01',
    updatedAt: '2023-02-05',
    tags: ['tailwindcss', 'css', 'frontend'],
    categories: ['web development'],
    featuredImage: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Getting Started with TypeScript',
    content: 'An introduction to TypeScript and how it can improve your JavaScript code.',
    excerpt: 'Improve your JavaScript code with TypeScript.',
    status: 'published',
    author: 'David Johnson',
    createdAt: '2023-03-10',
    updatedAt: '2023-03-15',
    tags: ['typescript', 'javascript', 'programming'],
    categories: ['web development'],
    featuredImage: 'https://via.placeholder.com/150',
  },
];

export const PostManager = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredPosts = posts.filter(post => {
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter ? post.status === statusFilter : true;
    return searchMatch && statusMatch;
  });

  return (
    <div className="container py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Posts</CardTitle>
          <div className="space-x-2">
            <Button><Plus className="mr-2 h-4 w-4" /> Add Post</Button>
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
              <Select onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
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
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>
                        <Badge variant={post.status === 'published' ? 'success' : post.status === 'draft' ? 'secondary' : 'warning'}>
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{post.tags.join(', ')}</TableCell>
                      <TableCell>{post.categories.join(', ')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
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
