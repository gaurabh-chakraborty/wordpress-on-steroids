
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  uploadMedia: (file: File) => Promise<MediaItem>;
  deleteMedia: (id: string) => void;
  // Mock API functions
  mockApiCall: (endpoint: string, data?: any) => Promise<any>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

// Enhanced mock data for realistic demonstration
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Welcome to Your New Admin Panel',
    content: 'This is your first blog post. You can edit or delete it, then start creating your own content! This comprehensive admin panel provides all the tools you need to manage your website effectively.',
    excerpt: 'Welcome to your new WordPress-like admin panel with full content management capabilities...',
    status: 'published',
    author: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    tags: ['welcome', 'getting-started', 'admin'],
    categories: ['General', 'Announcements'],
    featuredImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'Getting Started with Content Creation',
    content: 'Learn how to create amazing content with our powerful editor. This guide will walk you through all the features available in your content management system.',
    excerpt: 'A comprehensive guide to content creation with advanced features and best practices...',
    status: 'published',
    author: 'admin',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    tags: ['tutorial', 'content', 'guide'],
    categories: ['Tutorials', 'How-to'],
    featuredImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop'
  },
  {
    id: '3',
    title: 'Advanced Features and Customization',
    content: 'Explore the advanced features of your admin panel including custom fields, media management, user roles, and plugin system.',
    excerpt: 'Dive deep into advanced customization options and power user features...',
    status: 'draft',
    author: 'editor',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
    tags: ['advanced', 'customization', 'features'],
    categories: ['Advanced', 'Customization'],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop'
  },
  {
    id: '4',
    title: 'SEO Best Practices for Your Website',
    content: 'Learn essential SEO techniques to improve your website\'s visibility in search engines. This comprehensive guide covers everything from keywords to meta tags.',
    excerpt: 'Master SEO fundamentals and boost your website\'s search engine rankings...',
    status: 'published',
    author: 'author',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
    tags: ['seo', 'marketing', 'optimization'],
    categories: ['SEO', 'Marketing'],
    featuredImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=200&fit=crop'
  },
  {
    id: '5',
    title: 'Building Responsive Web Designs',
    content: 'Create beautiful, responsive websites that work perfectly on all devices. Learn about mobile-first design principles and modern CSS techniques.',
    excerpt: 'Master responsive design with modern techniques and best practices...',
    status: 'pending',
    author: 'author',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    tags: ['design', 'responsive', 'css'],
    categories: ['Design', 'Development'],
    featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop'
  }
];

const mockPages: Page[] = [
  {
    id: '1',
    title: 'Home Page',
    content: 'Welcome to our website! This is the home page content showcasing our products and services.',
    slug: 'home',
    status: 'published',
    template: 'default',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'About Us',
    content: 'Learn more about our company, mission, and the talented team behind our success.',
    slug: 'about',
    status: 'published',
    template: 'full-width',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Contact',
    content: 'Get in touch with us through our contact form or find our office locations.',
    slug: 'contact',
    status: 'published',
    template: 'contact',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    title: 'Services',
    content: 'Explore our comprehensive range of services designed to meet your business needs.',
    slug: 'services',
    status: 'draft',
    template: 'landing',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: '2',
    username: 'editor',
    email: 'editor@example.com',
    role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    createdAt: '2024-01-02T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '3',
    username: 'author',
    email: 'author@example.com',
    role: 'author',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    createdAt: '2024-01-03T00:00:00Z',
    lastLogin: '2024-01-14T15:45:00Z'
  },
  {
    id: '4',
    username: 'subscriber1',
    email: 'subscriber1@example.com',
    role: 'subscriber',
    createdAt: '2024-01-04T00:00:00Z',
    lastLogin: '2024-01-12T09:15:00Z'
  },
  {
    id: '5',
    username: 'johndoe',
    email: 'john.doe@example.com',
    role: 'author',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
    createdAt: '2024-01-05T00:00:00Z',
    lastLogin: '2024-01-13T14:20:00Z'
  }
];

const mockMedia: MediaItem[] = [
  {
    id: '1',
    filename: 'hero-image.jpg',
    url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
    type: 'image',
    size: 234567,
    uploadedAt: '2024-01-01T00:00:00Z',
    alt: 'Hero image for homepage'
  },
  {
    id: '2',
    filename: 'blog-featured.jpg',
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
    type: 'image',
    size: 345678,
    uploadedAt: '2024-01-02T00:00:00Z',
    alt: 'Featured blog post image'
  },
  {
    id: '3',
    filename: 'office-space.jpg',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
    type: 'image',
    size: 456789,
    uploadedAt: '2024-01-03T00:00:00Z',
    alt: 'Modern office workspace'
  },
  {
    id: '4',
    filename: 'team-meeting.mp4',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    type: 'video',
    size: 15234567,
    uploadedAt: '2024-01-04T00:00:00Z',
    alt: 'Team meeting video'
  },
  {
    id: '5',
    filename: 'company-brochure.pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    type: 'document',
    size: 987654,
    uploadedAt: '2024-01-05T00:00:00Z',
    alt: 'Company brochure PDF'
  }
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentUser] = useState<User>(mockUsers[0]);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [media, setMedia] = useState<MediaItem[]>(mockMedia);

  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: '1',
      name: 'SEO Optimizer Pro',
      description: 'Advanced SEO optimization with keyword analysis, meta tag management, and search engine indexing.',
      version: '2.1.0',
      author: 'SEO Team',
      isActive: true,
      isInstalled: true,
      icon: 'Search',
      settings: {
        autoOptimize: true,
        keywordDensity: 2.5,
        enableSitemap: true
      }
    },
    {
      id: '2',
      name: 'Contact Form Builder',
      description: 'Build beautiful, responsive contact forms with drag-and-drop interface and spam protection.',
      version: '3.0.1',
      author: 'Form Builder Inc',
      isActive: false,
      isInstalled: true,
      icon: 'Mail',
      settings: {
        enableCaptcha: true,
        emailNotifications: true,
        customStyling: false
      }
    },
    {
      id: '3',
      name: 'Social Media Share',
      description: 'Add customizable social media sharing buttons with analytics and multiple platform support.',
      version: '1.8.3',
      author: 'Social Team',
      isActive: true,
      isInstalled: true,
      icon: 'Share2',
      settings: {
        platforms: ['facebook', 'twitter', 'linkedin'],
        showCounts: true,
        position: 'bottom'
      }
    },
    {
      id: '4',
      name: 'Advanced Analytics',
      description: 'Comprehensive website analytics with visitor tracking, conversion monitoring, and detailed reports.',
      version: '4.2.0',
      author: 'Analytics Pro',
      isActive: false,
      isInstalled: true,
      icon: 'BarChart3'
    },
    {
      id: '5',
      name: 'E-commerce Suite',
      description: 'Complete e-commerce solution with product management, payment processing, and inventory tracking.',
      version: '5.1.2',
      author: 'Commerce Solutions',
      isActive: false,
      isInstalled: false,
      icon: 'ShoppingCart'
    }
  ]);

  // Calculate dynamic stats
  const stats: DashboardStats = {
    totalPosts: posts.length,
    totalPages: pages.length,
    totalUsers: users.length,
    totalComments: 23, // Mock comment count
    recentActivity: [
      {
        id: '1',
        type: 'post',
        action: 'published',
        description: `Published "${posts[0]?.title}"`,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        user: 'admin'
      },
      {
        id: '2',
        type: 'user',
        action: 'created',
        description: 'Created new user "johndoe"',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        user: 'admin'
      },
      {
        id: '3',
        type: 'plugin',
        action: 'activated',
        description: 'Activated "SEO Optimizer Pro" plugin',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        user: 'admin'
      },
      {
        id: '4',
        type: 'page',
        action: 'updated',
        description: 'Updated "About Us" page',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        user: 'editor'
      },
      {
        id: '5',
        type: 'post',
        action: 'draft',
        description: 'Created draft "Building Responsive Web Designs"',
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        user: 'author'
      }
    ]
  };

  // Mock API simulation
  const mockApiCall = async (endpoint: string, data?: any): Promise<any> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    console.log(`Mock API Call: ${endpoint}`, data);
    
    // Simulate different responses based on endpoint
    switch (endpoint) {
      case '/api/posts':
        return { success: true, data: posts };
      case '/api/users':
        return { success: true, data: users };
      case '/api/analytics':
        return {
          success: true,
          data: {
            pageViews: 12450,
            uniqueVisitors: 3250,
            bounceRate: 0.34,
            avgSessionDuration: '3:45'
          }
        };
      case '/api/seo-report':
        return {
          success: true,
          data: {
            overallScore: 85,
            issues: 3,
            suggestions: 7,
            keywords: ['web design', 'cms', 'admin panel']
          }
        };
      default:
        return { success: true, message: 'Operation completed successfully' };
    }
  };

  const createPost = (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPosts(prev => [newPost, ...prev]);
    
    // Simulate API call
    mockApiCall('/api/posts', newPost);
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, ...updates, updatedAt: new Date().toISOString() }
        : post
    ));
    
    // Simulate API call
    mockApiCall(`/api/posts/${id}`, updates);
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
    
    // Simulate API call
    mockApiCall(`/api/posts/${id}`, { method: 'DELETE' });
  };

  const createPage = (pageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPage: Page = {
      ...pageData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPages(prev => [newPage, ...prev]);
    
    mockApiCall('/api/pages', newPage);
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    setPages(prev => prev.map(page => 
      page.id === id 
        ? { ...page, ...updates, updatedAt: new Date().toISOString() }
        : page
    ));
    
    mockApiCall(`/api/pages/${id}`, updates);
  };

  const deletePage = (id: string) => {
    setPages(prev => prev.filter(page => page.id !== id));
    mockApiCall(`/api/pages/${id}`, { method: 'DELETE' });
  };

  const createUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString()
    };
    setUsers(prev => [...prev, newUser]);
    mockApiCall('/api/users', newUser);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ));
    mockApiCall(`/api/users/${id}`, updates);
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    mockApiCall(`/api/users/${id}`, { method: 'DELETE' });
  };

  const togglePlugin = (id: string) => {
    setPlugins(prev => prev.map(plugin =>
      plugin.id === id ? { ...plugin, isActive: !plugin.isActive } : plugin
    ));
    
    const plugin = plugins.find(p => p.id === id);
    mockApiCall(`/api/plugins/${id}/toggle`, { isActive: !plugin?.isActive });
  };

  const installPlugin = (plugin: Plugin) => {
    setPlugins(prev => prev.map(p =>
      p.id === plugin.id ? { ...p, isInstalled: true } : p
    ));
    mockApiCall(`/api/plugins/${plugin.id}/install`);
  };

  const uploadMedia = async (file: File): Promise<MediaItem> => {
    // Simulate file upload
    const newMediaItem: MediaItem = {
      id: Date.now().toString(),
      filename: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 'document',
      size: file.size,
      uploadedAt: new Date().toISOString(),
      alt: file.name
    };
    
    setMedia(prev => [newMediaItem, ...prev]);
    await mockApiCall('/api/media/upload', { filename: file.name, size: file.size });
    
    return newMediaItem;
  };

  const deleteMedia = (id: string) => {
    setMedia(prev => prev.filter(item => item.id !== id));
    mockApiCall(`/api/media/${id}`, { method: 'DELETE' });
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update last login times for demonstration
      if (Math.random() > 0.9) {
        const randomUserId = users[Math.floor(Math.random() * users.length)]?.id;
        if (randomUserId) {
          updateUser(randomUserId, { lastLogin: new Date().toISOString() });
        }
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [users]);

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
      installPlugin,
      uploadMedia,
      deleteMedia,
      mockApiCall
    }}>
      {children}
    </AdminContext.Provider>
  );
};
