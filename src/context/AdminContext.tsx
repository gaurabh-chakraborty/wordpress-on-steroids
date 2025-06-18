
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Post, Page, Plugin, MediaItem, DashboardStats, Theme, ThemeCustomization } from '@/types/admin';
import { Product, Order, Customer, Category, Coupon } from '@/types/ecommerce';
import { Widget, WidgetType } from '@/types/widgets';
import { dataService } from '@/services/dataService';

interface AdminContextType {
  // Authentication
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => void;
  logout: () => void;
  
  // ... keep existing code (currentUser through mockApiCall properties)
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
  themes: Theme[];
  activeTheme: Theme | null;
  activateTheme: (id: string) => void;
  installTheme: (theme: Theme) => void;
  uninstallTheme: (id: string) => void;
  updateThemeCustomization: (customization: ThemeCustomization) => void;
  mockApiCall: (endpoint: string, data?: any) => Promise<any>;
  
  // E-commerce
  products: Product[];
  orders: Order[];
  customers: Customer[];
  categories: Category[];
  coupons: Coupon[];
  createProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Widgets
  widgets: Widget[];
  widgetTypes: WidgetType[];
  createWidget: (widget: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  deleteWidget: (id: string) => void;
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

const mockThemes: Theme[] = [
  {
    id: '1',
    name: 'Default Theme',
    description: 'Clean and modern default theme with responsive design',
    version: '1.0.0',
    author: 'Lovable Team',
    isActive: true,
    isInstalled: true,
    screenshot: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    tags: ['default', 'responsive', 'clean'],
    features: ['Responsive Design', 'Dark Mode Support', 'SEO Optimized', 'Fast Loading'],
    customization: {
      colors: { primary: '#3b82f6', secondary: '#6b7280', accent: '#10b981' },
      typography: { headingFont: 'Inter', bodyFont: 'Inter' },
      layout: { containerWidth: '1200px', headerStyle: 'modern' }
    }
  },
  {
    id: '2',
    name: 'Blog Master',
    description: 'Perfect theme for bloggers with beautiful typography and reading experience',
    version: '2.0.1',
    author: 'Blog Themes Co',
    isActive: false,
    isInstalled: true,
    screenshot: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
    tags: ['blog', 'typography', 'reading'],
    features: ['Beautiful Typography', 'Reading Mode', 'Social Sharing', 'Comment System'],
    customization: {
      colors: { primary: '#1f2937', secondary: '#6b7280', accent: '#f59e0b' },
      typography: { headingFont: 'Merriweather', bodyFont: 'Georgia' },
      layout: { containerWidth: '800px', headerStyle: 'classic' }
    },
    demoContent: {
      pages: [
        { title: 'Blog Home', content: 'Welcome to our amazing blog.', slug: 'blog-home', template: 'default' },
        { title: 'About the Author', content: 'Learn more about the blog author.', slug: 'about-author', template: 'default' }
      ],
      posts: [
        { title: 'Getting Started with Blogging', content: 'A comprehensive guide to start your blogging journey.', excerpt: 'Everything you need to know about blogging.' },
        { title: 'Writing Tips for Beginners', content: 'Essential writing tips for new bloggers.', excerpt: 'Improve your writing skills with these tips.' }
      ],
      media: []
    }
  },
  {
    id: '3',
    name: 'E-Commerce Pro',
    description: 'Professional e-commerce theme with product showcases and shopping cart',
    version: '3.1.0',
    author: 'Commerce Solutions',
    isActive: false,
    isInstalled: true,
    screenshot: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    tags: ['ecommerce', 'shop', 'product'],
    features: ['Product Gallery', 'Shopping Cart', 'Payment Integration', 'Inventory Management'],
    customization: {
      colors: { primary: '#059669', secondary: '#6b7280', accent: '#dc2626' },
      typography: { headingFont: 'Roboto', bodyFont: 'Open Sans' },
      layout: { containerWidth: '1400px', headerStyle: 'modern' }
    },
    demoContent: {
      pages: [
        { title: 'Shop', content: 'Browse our amazing products.', slug: 'shop', template: 'full-width' },
        { title: 'Cart', content: 'Your shopping cart items.', slug: 'cart', template: 'default' }
      ],
      posts: [
        { title: 'New Product Launch', content: 'Exciting new products now available.', excerpt: 'Check out our latest products.' },
        { title: 'Sale Event', content: 'Limited time offers on selected items.', excerpt: 'Don\'t miss our special offers.' }
      ],
      media: []
    }
  }
];

const mockWidgetTypes: WidgetType[] = [
  {
    id: 'text',
    name: 'Text Widget',
    description: 'Simple text content widget',
    category: 'Content',
    icon: 'Type',
    defaultContent: { text: 'Enter your text here...' },
    settingsSchema: [
      { key: 'text', label: 'Text Content', type: 'textarea', defaultValue: '', required: true }
    ]
  },
  {
    id: 'image',
    name: 'Image Widget',
    description: 'Display images with optional captions',
    category: 'Media',
    icon: 'Image',
    defaultContent: { src: '', alt: '', caption: '' },
    settingsSchema: [
      { key: 'src', label: 'Image URL', type: 'image', defaultValue: '', required: true },
      { key: 'alt', label: 'Alt Text', type: 'text', defaultValue: '' },
      { key: 'caption', label: 'Caption', type: 'text', defaultValue: '' }
    ]
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    salePrice: 249.99,
    sku: 'WH-001',
    stock: 45,
    category: 'Electronics',
    tags: ['wireless', 'audio', 'premium'],
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'],
    status: 'active',
    type: 'simple',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

const mockPlugins: Plugin[] = [
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
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  // Authentication state with persistence
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => dataService.load('adminAuth', false)
  );
  
  const login = (credentials: { username: string; password: string }) => {
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAuthenticated(true);
      dataService.save('adminAuth', true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    dataService.save('adminAuth', false);
  };

  // Check for existing auth on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentUser] = useState<User>(mockUsers[0]);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [plugins, setPlugins] = useState<Plugin[]>(mockPlugins);
  const [media, setMedia] = useState<MediaItem[]>(mockMedia);
  const [themes, setThemes] = useState<Theme[]>(mockThemes);
  const [activeTheme, setActiveTheme] = useState<Theme | null>(mockThemes[0]);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [widgetTypes] = useState<WidgetType[]>(mockWidgetTypes);

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

  const activateTheme = (id: string) => {
    setThemes(prev => prev.map(theme => ({
      ...theme,
      isActive: theme.id === id
    })));
    
    const theme = themes.find(t => t.id === id);
    if (theme) {
      setActiveTheme(theme);
    }
    
    mockApiCall(`/api/themes/${id}/activate`);
  };

  const installTheme = (theme: Theme) => {
    setThemes(prev => prev.map(t =>
      t.id === theme.id ? { ...t, isInstalled: true } : t
    ));
    mockApiCall(`/api/themes/${theme.id}/install`);
  };

  const uninstallTheme = (id: string) => {
    setThemes(prev => prev.map(theme =>
      theme.id === id ? { ...theme, isInstalled: false, isActive: false } : theme
    ));
    
    if (activeTheme?.id === id) {
      const defaultTheme = themes.find(t => t.id === '1');
      setActiveTheme(defaultTheme || null);
    }
    
    mockApiCall(`/api/themes/${id}/uninstall`);
  };

  const updateThemeCustomization = (customization: ThemeCustomization) => {
    setThemes(prev => prev.map(theme =>
      theme.id === customization.themeId
        ? { ...theme, customization }
        : theme
    ));
    
    if (activeTheme?.id === customization.themeId) {
      setActiveTheme(prev => prev ? { ...prev, customization } : null);
    }
    
    mockApiCall(`/api/themes/${customization.themeId}/customize`, customization);
  };

  const createProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date().toISOString() }
        : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const createWidget = (widgetData: Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newWidget: Widget = {
      ...widgetData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setWidgets(prev => [...prev, newWidget]);
  };

  const updateWidget = (id: string, updates: Partial<Widget>) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === id 
        ? { ...widget, ...updates, updatedAt: new Date().toISOString() }
        : widget
    ));
  };

  const deleteWidget = (id: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
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
      themes,
      activeTheme,
      activateTheme,
      installTheme,
      uninstallTheme,
      updateThemeCustomization,
      mockApiCall,
      products,
      orders,
      customers,
      categories,
      coupons,
      createProduct,
      updateProduct,
      deleteProduct,
      widgets,
      widgetTypes,
      createWidget,
      updateWidget,
      deleteWidget
    }}>
      {children}
    </AdminContext.Provider>
  );
};
