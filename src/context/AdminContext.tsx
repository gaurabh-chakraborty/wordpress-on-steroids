import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Post, Page, Plugin, MediaItem, DashboardStats } from '@/types/admin';

interface AdminContextType {
  currentUser: User;
  posts: Post[];
  pages: Page[];
  users: User[];
  plugins: Plugin[];
  media: MediaItem[];
  stats: DashboardStats;
  activeSection: string;
  setActiveSection: (section: string) => void;
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  createPage: (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  createUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  togglePlugin: (id: string) => void;
  installPlugin: (plugin: Plugin) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock data - in real app this would come from API/database
  const [currentUser] = useState<User>({
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString()
  });

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Welcome to Your New Admin Panel',
      content: 'This is your first blog post. You can edit or delete it, then start creating your own content!',
      excerpt: 'Welcome to your new WordPress-like admin panel...',
      status: 'published',
      author: 'admin',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      tags: ['welcome', 'getting-started'],
      categories: ['General'],
      featuredImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Getting Started with Content Creation',
      content: 'Learn how to create amazing content with our powerful editor.',
      excerpt: 'A comprehensive guide to content creation...',
      status: 'draft',
      author: 'admin',
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
      tags: ['tutorial', 'content'],
      categories: ['Tutorials'],
      featuredImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop'
    }
  ]);

  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      title: 'Home Page',
      content: 'Welcome to our website! This is the home page content.',
      slug: 'home',
      status: 'published',
      template: 'default',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    currentUser,
    {
      id: '2',
      username: 'editor',
      email: 'editor@example.com',
      role: 'editor',
      createdAt: '2024-01-02T00:00:00Z'
    },
    {
      id: '3',
      username: 'author',
      email: 'author@example.com',
      role: 'author',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
      createdAt: '2024-01-03T00:00:00Z',
      lastLogin: '2024-01-10T00:00:00Z'
    }
  ]);

  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: '1',
      name: 'SEO Optimizer',
      description: 'Optimize your content for search engines',
      version: '1.0.0',
      author: 'SEO Team',
      isActive: true,
      isInstalled: true,
      icon: 'Search'
    },
    {
      id: '2',
      name: 'Contact Form Builder',
      description: 'Build beautiful contact forms with ease',
      version: '2.1.0',
      author: 'Form Builder Inc',
      isActive: false,
      isInstalled: true,
      icon: 'Mail'
    },
    {
      id: '3',
      name: 'Social Media Share',
      description: 'Add social media sharing buttons to your content',
      version: '1.5.0',
      author: 'Social Team',
      isActive: false,
      isInstalled: true,
      icon: 'Share2'
    }
  ]);

  const [media] = useState<MediaItem[]>([
    {
      id: '1',
      filename: 'hero-image.jpg',
      url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
      type: 'image',
      size: 234567,
      uploadedAt: '2024-01-01T00:00:00Z',
      alt: 'Hero image'
    },
    {
      id: '2',
      filename: 'blog-featured.jpg',
      url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
      type: 'image',
      size: 345678,
      uploadedAt: '2024-01-02T00:00:00Z',
      alt: 'Blog featured image'
    }
  ]);

  const stats: DashboardStats = {
    totalPosts: posts.length,
    totalPages: pages.length,
    totalUsers: users.length,
    totalComments: 5,
    recentActivity: [
      {
        id: '1',
        type: 'post',
        action: 'published',
        description: 'Published "Welcome to Your New Admin Panel"',
        timestamp: '2024-01-01T00:00:00Z',
        user: 'admin'
      },
      {
        id: '2',
        type: 'user',
        action: 'created',
        description: 'Created new user "editor"',
        timestamp: '2024-01-02T00:00:00Z',
        user: 'admin'
      }
    ]
  };

  const createPost = (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, ...updates, updatedAt: new Date().toISOString() }
        : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const createPage = (pageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPage: Page = {
      ...pageData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPages(prev => [newPage, ...prev]);
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    setPages(prev => prev.map(page => 
      page.id === id 
        ? { ...page, ...updates, updatedAt: new Date().toISOString() }
        : page
    ));
  };

  const deletePage = (id: string) => {
    setPages(prev => prev.filter(page => page.id !== id));
  };

  const createUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString()
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const togglePlugin = (id: string) => {
    setPlugins(prev => prev.map(plugin =>
      plugin.id === id ? { ...plugin, isActive: !plugin.isActive } : plugin
    ));
  };

  const installPlugin = (plugin: Plugin) => {
    setPlugins(prev => prev.map(p =>
      p.id === plugin.id ? { ...p, isInstalled: true } : p
    ));
  };

  return (
    <AdminContext.Provider value={{
      currentUser,
      posts,
      pages,
      users,
      plugins,
      media,
      stats,
      activeSection,
      setActiveSection,
      createPost,
      updatePost,
      deletePost,
      createPage,
      updatePage,
      deletePage,
      createUser,
      updateUser,
      deleteUser,
      togglePlugin,
      installPlugin
    }}>
      {children}
    </AdminContext.Provider>
  );
};
