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
    description: 'High-quality wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    salePrice: 249.99,
    sku: 'WH-001',
    stock: 45,
    category: 'Electronics',
    tags: ['wireless', 'audio', 'premium', 'noise-cancelling'],
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'],
    status: 'active',
    type: 'simple',
    weight: 0.5,
    dimensions: { length: 20, width: 18, height: 8 },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and 7-day battery life.',
    price: 399.99,
    sku: 'SW-002',
    stock: 23,
    category: 'Electronics',
    tags: ['smartwatch', 'fitness', 'health', 'gps'],
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'],
    status: 'active',
    type: 'variable',
    weight: 0.3,
    variants: [
      {
        id: 'v1',
        attributes: { color: 'Black', size: '42mm' },
        price: 399.99,
        sku: 'SW-002-BK-42',
        stock: 12
      },
      {
        id: 'v2',
        attributes: { color: 'Silver', size: '46mm' },
        price: 429.99,
        sku: 'SW-002-SL-46',
        stock: 11
      }
    ],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    description: 'Professional ergonomic office chair with lumbar support and adjustable height.',
    price: 450.00,
    sku: 'OC-003',
    stock: 12,
    category: 'Furniture',
    tags: ['office', 'ergonomic', 'chair', 'furniture'],
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop'],
    status: 'active',
    type: 'simple',
    weight: 25.0,
    dimensions: { length: 70, width: 70, height: 120 },
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  }
];

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customerId: '1',
    customerEmail: 'john.doe@example.com',
    status: 'delivered',
    items: [
      {
        id: '1',
        productId: '1',
        name: 'Premium Wireless Headphones',
        price: 249.99,
        quantity: 1,
        total: 249.99
      }
    ],
    subtotal: 249.99,
    tax: 22.50,
    shipping: 15.00,
    total: 287.49,
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US'
    },
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customerId: '2',
    customerEmail: 'jane.smith@example.com',
    status: 'processing',
    items: [
      {
        id: '2',
        productId: '2',
        name: 'Smart Watch Pro',
        price: 399.99,
        quantity: 1,
        total: 399.99
      }
    ],
    subtotal: 399.99,
    tax: 36.00,
    shipping: 15.00,
    total: 450.99,
    billingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      address1: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90210',
      country: 'US'
    },
    shippingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      address1: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90210',
      country: 'US'
    },
    paymentMethod: 'PayPal',
    pay mentStatus: 'paid',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  }
];

const mockCustomers: Customer[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1-555-0123',
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US'
    },
    orders: ['1'],
    totalSpent: 287.49,
    createdAt: '2024-01-01T00:00:00Z',
    lastOrderAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+1-555-0456',
    orders: ['2'],
    totalSpent: 450.99,
    createdAt: '2024-01-05T00:00:00Z',
    lastOrderAt: '2024-01-12T00:00:00Z'
  },
  {
    id: '3',
    email: 'bob.wilson@example.com',
    firstName: 'Bob',
    lastName: 'Wilson',
    orders: [],
    totalSpent: 0,
    createdAt: '2024-01-08T00:00:00Z'
  }
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
    count: 2
  },
  {
    id: '2',
    name: 'Furniture',
    slug: 'furniture',
    description: 'Home and office furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    count: 1
  },
  {
    id: '3',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel',
    count: 0
  }
];

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'percentage',
    amount: 10,
    description: 'Welcome discount for new customers',
    minAmount: 50,
    usageLimit: 100,
    usedCount: 25,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    code: 'SAVE50',
    type: 'fixed',
    amount: 50,
    description: 'Fixed $50 discount on orders over $200',
    minAmount: 200,
    usageLimit: 50,
    usedCount: 12,
    expiryDate: '2024-12-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z'
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
  // Authentication state with enhanced persistence
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
    const savedAuth = dataService.load('adminAuth', false);
    if (savedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentUser] = useState<User>(mockUsers[0]);
  
  // Enhanced state management with persistence
  const [posts, setPosts] = useState<Post[]>(() => 
    dataService.load('posts', mockPosts)
  );
  const [pages, setPages] = useState<Page[]>(() => 
    dataService.load('pages', mockPages)
  );
  const [users, setUsers] = useState<User[]>(() => 
    dataService.load('users', mockUsers)
  );
  const [plugins, setPlugins] = useState<Plugin[]>(() => 
    dataService.load('plugins', mockPlugins)
  );
  const [media, setMedia] = useState<MediaItem[]>(() => 
    dataService.load('media', mockMedia)
  );
  const [themes, setThemes] = useState<Theme[]>(() => 
    dataService.load('themes', mockThemes)
  );
  const [activeTheme, setActiveTheme] = useState<Theme | null>(() => 
    dataService.load('activeTheme', mockThemes[0])
  );
  const [products, setProducts] = useState<Product[]>(() => 
    dataService.load('products', mockProducts)
  );
  const [orders, setOrders] = useState<Order[]>(() => 
    dataService.load('orders', mockOrders)
  );
  const [customers, setCustomers] = useState<Customer[]>(() => 
    dataService.load('customers', mockCustomers)
  );
  const [categories, setCategories] = useState<Category[]>(() => 
    dataService.load('categories', mockCategories)
  );
  const [coupons, setCoupons] = useState<Coupon[]>(() => 
    dataService.load('coupons', mockCoupons)
  );
  const [widgets, setWidgets] = useState<Widget[]>(() => 
    dataService.load('widgets', [])
  );
  const [widgetTypes] = useState<WidgetType[]>(mockWidgetTypes);

  // Persist data changes
  useEffect(() => {
    dataService.save('posts', posts);
  }, [posts]);

  useEffect(() => {
    dataService.save('pages', pages);
  }, [pages]);

  useEffect(() => {
    dataService.save('users', users);
  }, [users]);

  useEffect(() => {
    dataService.save('plugins', plugins);
  }, [plugins]);

  useEffect(() => {
    dataService.save('media', media);
  }, [media]);

  useEffect(() => {
    dataService.save('themes', themes);
  }, [themes]);

  useEffect(() => {
    dataService.save('activeTheme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    dataService.save('products', products);
  }, [products]);

  useEffect(() => {
    dataService.save('orders', orders);
  }, [orders]);

  useEffect(() => {
    dataService.save('customers', customers);
  }, [customers]);

  useEffect(() => {
    dataService.save('categories', categories);
  }, [categories]);

  useEffect(() => {
    dataService.save('coupons', coupons);
  }, [coupons]);

  useEffect(() => {
    dataService.save('widgets', widgets);
  }, [widgets]);

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
    mockApiCall('/api/products', newProduct);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date().toISOString() }
        : product
    ));
    mockApiCall(`/api/products/${id}`, updates);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    mockApiCall(`/api/products/${id}`, { method: 'DELETE' });
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => 
      order.id === id 
        ? { ...order, ...updates, updatedAt: new Date().toISOString() }
        : order
    ));
    mockApiCall(`/api/orders/${id}`, updates);
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
      updateOrder,
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
