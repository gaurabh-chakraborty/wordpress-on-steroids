
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'author' | 'subscriber';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: 'published' | 'draft' | 'pending';
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  categories: string[];
  featuredImage?: string;
}

export interface Page {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: 'published' | 'draft' | 'pending';
  template: string;
  createdAt: string;
  updatedAt: string;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  isActive: boolean;
  isInstalled: boolean;
  icon: string;
  settings?: Record<string, any>;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  uploadedAt: string;
  alt?: string;
}

export interface DashboardStats {
  totalPosts: number;
  totalPages: number;
  totalUsers: number;
  totalComments: number;
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'post' | 'page' | 'user' | 'plugin';
  action: string;
  description: string;
  timestamp: string;
  user: string;
}
